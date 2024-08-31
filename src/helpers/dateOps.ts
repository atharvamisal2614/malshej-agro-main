export const getDatesInRange = (
  startDate: string = "",
  endDate: string = ""
): number[] => {
  const start = new Date(startDate.slice(0, 15));
  const end = new Date(endDate.slice(0, 15));
  console.log(start, end);
  const date = new Date(start.getTime());

  const dates = [];

  // eslint-disable-next-line no-unmodified-loop-condition
  while (date <= end) {
    dates.push(new Date(date).getTime());
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

export const getDatesInRangeBackend = (
  startDate = "",
  endDate = ""
): number[] => {
  const start = new Date(startDate.slice(0, 10));
  const end = new Date(endDate.slice(0, 10));
  console.log(start, end);
  const date = new Date(start.getTime());

  const dates = [];

  // eslint-disable-next-line no-unmodified-loop-condition
  while (date <= end) {
    dates.push(new Date(date).getTime());
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

export const getIndianDate = (ds: Date): string => {
  const date = new Date(ds);
  // return

  const dateString = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  return dateString;
};

export const getDateNoFromNumber = (num: string): string => {
  if (num === "empty") return "";

  const d = new Date(parseInt(num));
  return d.getDate().toString();
};
