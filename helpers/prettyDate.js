const moment = require("moment");

module.exports = function prettyDate(uglyDate) {
  return moment(uglyDate).format("MMMM Do, YYYY");
};
