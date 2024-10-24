export function DateFormat(date) {
 const format = new Date(date)
  const month = format.toLocaleString("en", { month: "short" });
  return `${format.getFullYear()}-${month}-${format.getDate()}`;
}

export function getFormattedDate(date) {
  const format = new Date(date)
  return format.toISOString().slice(0, 10);
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}