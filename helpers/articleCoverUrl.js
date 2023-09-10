module.exports = function articleCoverUrl(cover, url) {
  const fileName = cover || "cover.png";

  return url + fileName;
};
