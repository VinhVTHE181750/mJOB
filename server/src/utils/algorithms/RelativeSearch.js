const Job = require("../../models/job/Job");
const JobPreference = require("../../models/user/JobPreference");
const PostPreference = require("../../models/user/PostPreference");
const User = require("../../models/user/User");

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
}

module.exports = {
  relevantJobSearch,
  relevantPostSearch,
};
