const timeIsWithinRange = (
  timeStamp: Date,
  range: { from: Date; to: Date }
) => {
  return (
    timeStamp.getTime() >= range.from.getTime() &&
    timeStamp.getTime() <= range.to.getTime()
  );
};

const incrementHours = (dateTime: Date, addHours: number) => {
  let incrementedDate = new Date(dateTime);
  incrementedDate.setHours(dateTime.getHours() + addHours);
  return incrementedDate;
};

export { timeIsWithinRange, incrementHours };
