module.exports = function preparePosts(posts) {
  // Hide drafts on production
  if(process.env.ELEVENTY_ENV === 'prod') {
    posts = posts.filter(post => {
      return post.data.status === 'published'
    });
  }

  // Sort them newest to oldest
  return [...posts].reverse();
};
