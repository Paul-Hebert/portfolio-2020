module.exports = function sort(array, key) {
  return [...array].sort((a, b) => {
    return a.data[key] < b.data[key] ? -1 : 1;
  });
};
