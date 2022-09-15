const addZeroToRight = (value: number): string => {
  return String(value).padStart(2, '0');
};

export const convertMinutesToHourString = (minutesAmount: number): string => {
  const hours = Math.floor(minutesAmount / 60);
  const minutes = minutesAmount % 60;

  return `${addZeroToRight(hours)}:${addZeroToRight(minutes)}`;
};
