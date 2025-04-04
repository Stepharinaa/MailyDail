import { formatDistanceToNow } from "date-fns";

function timeAgo(isoDate) {
  const date = new Date(isoDate);
  let timeAgoString = formatDistanceToNow(date) + " ago";
  timeAgoString = timeAgoString
    .replace("hour", "hr")
    .replace("hours", "hrs")
    .replace("minute", "min")
    .replace("minutes", "mins");
  return timeAgoString;
}

export default timeAgo;
