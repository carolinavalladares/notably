import { IMonths } from "@/types/types";

const months: IMonths = {
  english: [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ],
  portuguese: [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ],
};

export function formatMemberSince(dateString: string, language: string) {
  const [date, time] = dateString.split("T");

  console.log("date:", date, "time:", time);

  const [year, month, day] = date.split("-");
  const [hours, minutes, seconds] = time.split(":");

  return `${months[language as keyof IMonths][Number(month) - 1]}/${year}`;
}
