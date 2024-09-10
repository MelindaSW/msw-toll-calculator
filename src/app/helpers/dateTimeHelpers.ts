const isCorrectDateTimeFormat = (timestamp: string) => {
  const regexTimeStampWithMilliseconds =
    /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
  return regexTimeStampWithMilliseconds.test(timestamp);
};

export { isCorrectDateTimeFormat };
