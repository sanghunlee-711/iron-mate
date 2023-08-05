export const intToStringFormat = (num: number) => {
  return String(num).padStart(2, '0');
};

export const formatTime = (time: string) => {
  const DOUBLE_SEMI_REGEX = /(\d{1,2}):(\d{1,2}):(\d{1,2})/gi;

  if (!DOUBLE_SEMI_REGEX.test(time))
    throw new Error('타이머 문자열 형태가 안맞아요~');

  const [hours, minutes, seconds] = time.split(':');

  const formatedTimed = `${intToStringFormat(+hours)}:${intToStringFormat(
    +minutes
  )}:${intToStringFormat(+seconds)}`;

  return formatedTimed;
};