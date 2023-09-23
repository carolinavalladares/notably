export function formatDate(
  dateString: string,
  language: "english" | "portuguese"
) {
  const dateLocale = new Date(dateString).toLocaleString("pt-br");

  const [date, time] = dateLocale.split(", ");

  const [day, month, year] = date.split("/");
  const [hours, minutes, seconds] = time.split(":");

  if (language == "english") {
    return `${hours}:${minutes} - ${month}/${day}/${year}`;
  } else {
    return `${hours}:${minutes} - ${day}/${month}/${year}`;
  }
}
