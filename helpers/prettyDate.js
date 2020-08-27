const moment = require("moment");

module.exports = function prettyDate(uglyDate, includeSuffix = true) {
  format = includeSuffix ? "MMMM Do, YYYY" : "MMMM D, YYYY";
  return moment(uglyDate).utc().format(format);
};
