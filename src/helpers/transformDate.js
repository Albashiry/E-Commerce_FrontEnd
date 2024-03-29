
export default function transformDate(date) {
  const selectedDate = new Date(date);
  const getFullYear = selectedDate.getFullYear();
  const getMonth = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
  const getDay = (selectedDate.getDate() - 1).toString().padStart(2, '0');
  return `${getFullYear}-${getMonth}-${getDay}`;
}