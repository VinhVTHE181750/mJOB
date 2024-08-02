const Post = require("../models/forum/post/Post");
const { log } = require("./Logger");

async function addJobPost(j) {
  if (!j) {
    log("No job to post", "ERROR", "FORUM");
    return;
  }
  const title = j.title;

  // should do additional formatting to the content
  const content = j.description + "\nLeave your comments and reviews below!";
  await Post.create({
    title,
    content,
    UserId: j.UserId,
    isVerified: true,
    isAutoVerified: true,
    PostCategoryId: 2,
    tags: j.tags,
    status: "PUBLISHED",
  });
}

module.exports = { addJobPost };