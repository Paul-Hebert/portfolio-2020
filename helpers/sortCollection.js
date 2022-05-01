module.exports = function sort(array, key) {
  return [...array].sort((a, b) => {
    if(!a.data[key]) return 1;
    if(!b.data[key]) return -1;

    return a.data[key] < b.data[key] ? -1 : 1;
  });
};
