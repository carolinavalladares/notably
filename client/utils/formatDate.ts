export function formatDate(
  dateString: string,
  language: "english" | "portuguese"
) {
  const [date, time] = dateString.split("T");

  const [year, month, day] = date.split("-");
  const [hours, minutes, seconds] = time.split(":");

  if (language == "english") {
    return `${hours}:${minutes} - ${month}/${day}/${year}`;
  } else {
    return `${hours}:${minutes} - ${day}/${month}/${year}`;
  }
}
