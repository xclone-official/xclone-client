import moment from "moment";
export function customTimeFormat(createdAt) {
  const currentTime = moment();
  const tweetTime = moment(createdAt);

  const minutesDiff = currentTime.diff(tweetTime, "minutes");
  const secondsDiff = currentTime.diff(tweetTime, "seconds");
  const hoursDiff = currentTime.diff(tweetTime, "hours");

  if (hoursDiff > 0) {
    return `${hoursDiff}h ago`;
  } else if (minutesDiff > 0) {
    return `${minutesDiff}m ago`;
  } else {
    return `${secondsDiff}s ago`;
  }
}
