import moment from "moment";
const checkWeek = (date) => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  const year = parseInt(date.split("-")[0]);
  const week = parseInt(date.split("-")[1]);
  const weekNow = moment(mm + "-" + dd + "-" + yyyy, "MMDDYYYY").week();
  if (year < yyyy) {
    return false;
  }
  if (year === yyyy && week < weekNow) {
    return false;
  }
  return true;
};
export default checkWeek;
