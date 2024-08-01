const Post = require("../../models/forum/post/Post");
const Application = require("../../models/job/Application");
const Job = require("../../models/job/Job");
const JobPreference = require("../../models/user/JobPreference");
const PostPreference = require("../../models/user/PostPreference");
const User = require("../../models/user/User");
const { log } = require("../Logger");

/**
 * This function is used to search for the most relevant job for a user
 * @param {number} id: the id of user who is searching for a job
 * @param {Array} jobList: the list of jobs that the user can search for
 *
 * @returns {Array} the list of jobs that are most relevant to the user
 *
 * If the input job list contains fewer than 5 jobs, return the list as is
 * If the user does not have a job preference, return the list as is
 *
 * The relevance is calculated by scores:
 * - Location: 5 points if matched (district, city), 4 points if the location is in the same city, 3 points if the location is in nearby city
 * - Salary: 4 points if matched, 5 points if the salary is higher than the user's expectation, 2 points if the salary is lower than the user's expectation
 * - Tags: for each matched keywords, 1 point
 */
async function relevantJobSearch(id, jobList) {
  try {
    // if jobList is not an array, return null
    if (!Array.isArray(jobList)) {
      return null;
    }

    // if user with id is not found, return null
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }

    const userPreference = await JobPreference.findOne({
      where: {
        UserId: id,
      },
    });

    // if userPreference is not found, return the list as is
    if (!userPreference) {
      return jobList;
    }

    const { tags, type, location, salaryMin, salaryMax } = userPreference;

    // if jobList has fewer than 5 job, do not sort
    if (jobList.length < 5) {
      return jobList;
    }

    let scoreList = [];
    for (let job of jobList) {
      let score = 0;

      // calculate scores
      // 1. Location
      // Example: location = "Nam Tu Liem, Ha Noi"
      // job.location = "Nam Tu Liem, Ha Noi"
      // job.location = "Cau Giay, Ha Noi"
      // job.location = "Ha Noi"

      if (location.includes(job.location)) {
        // same city, district
        score += 5;
      } else if (job.location.includes(location.split(",")[1])) {
        // same city
        score += 4;
      } else {
        // missing nearby city score
      }

      // 2. Salary
      if (!salaryMax) {
        salaryMax = Number.MAX_VALUE;
      }

      if (!salaryMin) {
        salaryMin = 0;
      }

      if (salaryMin <= job.salary && job.salary <= salaryMax) {
        score += 4;
      } else if (job.salary > salaryMax) {
        score += 5;
      } else {
        score += 2;
      }

      // 3. Tags
      // Example: tags = "it,software,developer"
      // job.tags = "it,software,developer"
      // job.tags = "it,software"
      if (tags) {
        const tagList = tags.split(",");
        const jobTagList = job.tags.split(",");
        for (let tag of tagList) {
          if (jobTagList.includes(tag)) {
            score += 1;
          }
        }
      }

      // update the record with the score
      scoreList.push({ job, score });
    }

    // sort the jobList by score
    scoreList.sort((a, b) => b.score - a.score);
    let result = [];
    for (let i = 0; i < scoreList.length; i++) {
      result.push(scoreList[i].job);
    }
    return result;
  } catch (err) {
    log(err, "ERROR", "RelativeSearch.js");
    return null;
  }
}

/**
 *
 * @param {number} id the id of the user who is searching for a post
 * @param {Array} postList the list of posts that the user can search for
 *
 * @returns {Array} the list of posts that are most relevant to the user
 *
 * If the input post list contains fewer than 5 posts, return the list as is
 * If the user does not have a post preference, return the list as is
 *
 * The relevance is calculated by scores:
 * - Tags: for each matched keywords, 1 point
 * - Categories: for each matched keywords, 5 point
 */
async function relevantPostSearch(id, postList) {
  try {
    // if postList is not an array, return null
    if (!Array.isArray(postList)) {
      return null;
    }

    // if user with id is not found, return null
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }

    const userPreference = await PostPreference.findByPk(id);

    // if userPreference is not found, return the list as is
    if (!userPreference) {
      return postList;
    }

    // If postList has fewer than 5 posts, do not sort
    if (postList.length < 5) {
      return postList;
    }

    const { tags, categories } = userPreference;

    let scoreList = [];
    for (let post of postList) {
      let score = 0;

      // calculate scores
      // 1. Tags
      // Example: tags = "it,software,developer"
      // post.tags = "it,software,developer"
      // post.tags = "it,software"
      if (tags) {
        const tagList = tags.split(",");
        const postTagList = post.tags.split(",");
        for (let tag of tagList) {
          if (postTagList.includes(tag)) {
            score += 1;
          }
        }
      }

      // 2. Categories
      // Example: categories = "General,Job,Guide"
      // post.categories = "General,Job,Guide"
      // post.categories = "General,Job"
      if (categories) {
        const categoryList = categories.split(",");
        const postCategoryList = post.categories.split(",");
        for (let category of categoryList) {
          if (postCategoryList.includes(category)) {
            score += 5;
            break;
          }
        }
      }

      // update the record with the score
      scoreList.push({ post, score });
    }

    // sort the postList by score
    scoreList.sort((a, b) => b.score - a.score);
    let result = [];
    for (let i = 0; i < scoreList.length; i++) {
      result.push(scoreList[i].post);
    }
    return result;
  } catch (err) {
    log(err, "ERROR", "RelativeSearch.js");
    return null;
  }
}

/**
 *
 * @param {Job} job
 * @param {Array<Job>} jobList
 *
 * @returns {Array<Job>} the list of jobs that are most relevant to the job
 *
 * The relevance is calculated by scores:
 * - Location: 5 points if matched (district, city), 4 points if the location is in the same city, 3 points if the location is in nearby city
 * - Salary: 4 points if matched, 5 points if the salary is higher than the user's expectation, 2 points if the salary is lower than the user's expectation
 * - Tags: for each matched keywords, 1 point
 *
 * The jobList is sorted by score in descending order
 * If the input job list contains fewer than 5 jobs, return the list as is
 *
 */
async function relatedJobs(job, jobList) {
  try {
    if (!Array.isArray(jobList)) {
      return null;
    }

    if (!job) {
      return null;
    }

    if (jobList.length < 5) {
      return jobList;
    }

    let scoreList = [];
    for (let j of jobList) {
      let score = 0;
      if (job.location === j.location) {
        score += 5;
      } else if (j.location.includes(job.location.split(",")[1])) {
        score += 4;
      } else {
        // missing nearby city score
      }

      if (job.salaryMin <= j.salary && j.salary <= job.salaryMax) {
        score += 4;
      } else if (j.salary > job.salaryMax) {
        score += 5;
      } else {
        score += 2;
      }

      if (job.tags) {
        const tagList = job.tags.split(",");
        const jobTagList = j.tags.split(",");
        for (let tag of tagList) {
          if (jobTagList.includes(tag)) {
            score += 1;
          }
        }
      }

      scoreList.push({ job: j, score });
    }

    scoreList.sort((a, b) => b.score - a.score);
    let result = [];
    for (let i = 0; i < scoreList.length; i++) {
      result.push(scoreList[i].job);
    }

    return result;
  } catch (err) {
    log(err, "ERROR", "RelativeSearch.js");
    return null;
  }
}

/**
 *
 * @param {Post} post
 * @param {Array<Post>} postList
 *
 * @returns {Array<Post>} the list of posts that are most relevant to the post
 *
 * The relevance is calculated by scores:
 * - Tags: for each matched keywords, 1 point
 * - Categories: for each matched keywords, 5 point
 *
 * The postList is sorted by score in descending order
 * If the input post list contains fewer than 5 posts, return the list as is
 *
 */
async function relatedPosts(post, postList) {
  try {
    if (!Array.isArray(postList)) {
      return null;
    }

    if (!post) {
      return null;
    }

    if (postList.length < 5) {
      return postList;
    }

    let scoreList = [];
    for (let p of postList) {
      let score = 0;

      if (post.tags) {
        const tagList = post.tags.split(",");
        const postTagList = p.tags.split(",");
        for (let tag of tagList) {
          if (postTagList.includes(tag)) {
            score += 1;
          }
        }
      }

      if (post.categories) {
        const categoryList = post.categories.split(",");
        const postCategoryList = p.categories.split(",");
        for (let category of categoryList) {
          if (postCategoryList.includes(category)) {
            score += 5;
            break;
          }
        }
      }

      scoreList.push({ post: p, score });
    }

    scoreList.sort((a, b) => b.score - a.score);
    let result = [];
    for (let i = 0; i < scoreList.length; i++) {
      result.push(scoreList[i].post);
    }

    return result;
  } catch (err) {
    log(err, "ERROR", "RelativeSearch.js");
    return null;
  }
}

/**
 *
 * @param {Job} job
 *
 * @returns {Array<User>} the list of users that are most relevant to the job
 *
 * The relevance is calculated by scores:
 * - Location: 5 points if matched (district, city), 4 points if the location is in the same city, 3 points if the location is in nearby city
 * - Salary: 4 points if matched, 5 points if the salary is higher than the user's expectation, 2 points if the salary is lower than the user's expectation
 * - Tags: for each matched keywords, 1 point
 *
 * The userList is sorted by score in descending order
 * If the input user list contains fewer than 5 users, return the list as is
 *
 */
async function suggestApplicants(job) {
  try {
    const userList = await User.findAll({
      where: {
        availability: true,
      },
    });

    if (userList.length < 5) {
      return userList;
    }

    let scoreList = [];

    for (let user of userList) {
      let score = 0;

      const userPreference = await JobPreference.findOne({
        where: {
          UserId: user.id,
        },
      });

      if (!userPreference) {
        continue;
      }

      if (job.location === userPreference.location) {
        score += 5;
      } else if (job.location.includes(userPreference.location.split(",")[1])) {
        score += 4;
      } else {
        // missing nearby city score
      }

      if (userPreference.salaryMin <= job.salary && job.salary <= userPreference.salaryMax) {
        score += 4;
      } else if (job.salary > userPreference.salaryMax) {
        score += 5;
      } else {
        score += 2;
      }

      if (userPreference.tags) {
        const tagList = userPreference.tags.split(",");
        const jobTagList = job.tags.split(",");
        for (let tag of tagList) {
          if (jobTagList.includes(tag)) {
            score += 1;
          }
        }
      }

      scoreList.push({ user, score });
    }

    scoreList.sort((a, b) => b.score - a.score);
    let result = [];
    for (let i = 0; i < scoreList.length; i++) {
      result.push(scoreList[i].user);
    }

    return result;
  } catch (err) {
    log(err, "ERROR", "RelativeSearch.js");
    return null;
  }
}

/**
 *
 * @param {Job} job
 * @returns {Array<User>} the list of applicants that are most compatible to the job
 *
 * The compatibility is calculated by scores:
 * - Location: 5 points if matched (district, city), 4 points if the location is in the same city, 3 points if the location is in nearby city
 * - Salary: 4 points if matched, 5 points if the salary is higher than the user's expectation, 2 points if the salary is lower than the user's expectation
 * - Tags: for each matched keywords, 1 point
 * - Type: 2 points if matched, 0 otherwise
 *
 * For a job which recruits X applicants, this function will return at most X applicants
 * To be approved, the applicant must have a score of at least 10
 * And includes:
 * - The applicant's availability is true
 * - The applicant's is applying for the job
 */
async function autoApproval(job) {
  try {
    const userList = await Application.findAll({
      where: {
        JobId: job.id,
        status: "PENDING",
      },
    });

    let scoreList = [];

    for (let user of userList) {
      let score = 0;

      const userPreference = await JobPreference.findOne({
        where: {
          UserId: user.UserId,
        },
      });

      if (!userPreference) {
        continue;
      }

      if (job.location === userPreference.location) {
        score += 5;
      } else if (job.location.includes(userPreference.location.split(",")[1])) {
        score += 4;
      } else {
        // missing nearby city score
      }

      if (userPreference.salaryMin <= job.salary && job.salary <= userPreference.salaryMax) {
        score += 4;
      } else if (job.salary > userPreference.salaryMax) {
        score += 5;
      } else {
        score += 2;
      }

      if (job.type === userPreference.type) {
        score += 2;
      }

      if (userPreference.tags) {
        const tagList = userPreference.tags.split(",");
        const jobTagList = job.tags.split(",");
        for (let tag of tagList) {
          if (jobTagList.includes(tag)) {
            score += 1;
          }
        }
      }
      scoreList.push({ user, score });
    }

    scoreList.sort((a, b) => b.score - a.score);
    let result = [];
    for (let i = 0; i < job.recruitments; i++) {
      if (scoreList[i].score >= 10) {
        result.push(scoreList[i].user);
      }
    }

    for (let user of result) {
      await Application.update(
        {
          status: "ACCEPTED",
        },
        {
          where: {
            JobId: job.id,
            UserId: user.id,
          },
        }
      );
    }
  } catch (err) {
    log(err, "ERROR", "RelativeSearch.js");
    return null;
  }
}

module.exports = {
  relevantJobSearch,
  relevantPostSearch,
  relatedJobs
};
