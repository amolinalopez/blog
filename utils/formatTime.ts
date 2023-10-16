export const formatDateAndTime = (utcString: string): string => {
  const date = new Date(utcString);

  const options: Intl.DateTimeFormatOptions = {
    // year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23", // 24h 🔥
  };

  return date.toLocaleDateString("en-US", options);
};
