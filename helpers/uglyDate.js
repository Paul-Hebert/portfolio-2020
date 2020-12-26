const moment = require("moment");

module.exports = function uglyDate(uglyDate) {
  return moment(uglyDate).format('YYYY-MM-DD');
};
