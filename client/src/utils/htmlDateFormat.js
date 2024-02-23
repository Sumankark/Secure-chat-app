let htmlDateFormat = (date = new Date()) => {
  // note if date is passed other than undefined it will take
  // ie if date = "" then date will not be new Date() but it will be date ""
  date = new Date(date || new Date()).toLocaleDateString().split("/");
  let year = date[2];
  let month = date[0].length === 1 ? `0${date[0]}` : date[0];
  let day = date[1].length === 1 ? `0${date[1]}` : date[1];
  // converting to yyyy-mm-dd format
  let dateFormat = `${year}-${month}-${day}`;
  return dateFormat;
};
export default htmlDateFormat;

export const timeFormat = (date) => {
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  return date.toLocaleTimeString(undefined, options);
};
