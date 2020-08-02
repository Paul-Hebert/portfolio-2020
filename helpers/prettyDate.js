const moment = require("moment");

module.exports = function prettyDate(uglyDate) {
  return moment(uglyDate).utc().format("MMMM Do, YYYY");
};
