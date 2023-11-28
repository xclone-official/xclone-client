import moment from "moment";
export function customTimeFormat(createdAt) {
  const currentTime = moment();
  const tweetTime = moment(createdAt);

  const minutesDiff = currentTime.diff(tweetTime, "minutes");
  const secondsDiff = currentTime.diff(tweetTime, "seconds");
  const hoursDiff = currentTime.diff(tweetTime, "hours");

  if (hoursDiff > 0) {
    // console.log(`${hoursDiff}h ago`);
    return `${hoursDiff}h ago`;
  } else if (minutesDiff > 0) {
    // console.log(`${minutesDiff}m ago`);
    return `${minutesDiff}m ago`;
  } else {
    // console.log(`${secondsDiff}s ago`);
    return `${secondsDiff}s ago`;
  }
}
