//1080 -> 16:00
export function convertMinToHour(minutesAmount: number) {

  const hours = Math.floor(minutesAmount / 60);
  
  const minutes = minutesAmount % 60;

  //padStart and padEnd to add the a digit to hour and minutes in case it got only one

  return `${String(hours).padStart(2, '0')}:${String(minutes).padEnd(2, '0')}`
  }