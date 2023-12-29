export function convertDate(inputDate) {
  // Parse the input date string
  const date = new Date(inputDate);

  // Get the components of the date
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  // Format the time
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");

  // Construct the final formatted date string
  const formattedDate = `${formattedHours}:${formattedMinutes} ${ampm} · ${month} ${day}, ${year}`;

  return formattedDate;
}
