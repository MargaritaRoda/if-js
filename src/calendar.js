const calcWeeksCount = (daysInMonth, daysInWeek, dayOfWeek) => {
  return Math.ceil((dayOfWeek + daysInMonth) / daysInWeek);
};
console.log(calcWeeksCount(30, 7, 6));

const getWeekDays = function (startDay, daysInWeek, daysInMonth) {
  const week = [];
  for (
    let currentDay = startDay;
    currentDay < startDay + daysInWeek;
    currentDay += 1
  ) {
    if (currentDay > daysInMonth) {
      week.push(currentDay - daysInMonth);
    } else {
      week.push(currentDay);
    }
  }
  return week;
};

console.log(getWeekDays(27, 7, 30));

function getCalendarMonth(daysInMonth, daysInWeek, dayOfWeek) {
  if (dayOfWeek + 1 > daysInWeek) {
    throw Error('Day of week is greater than week days count');
  }
  const calendarMonth = [];
  let startDay = daysInMonth - dayOfWeek + 1;
  for (
    let i = 0;
    i < calcWeeksCount(daysInMonth, daysInWeek, dayOfWeek);
    i += 1
  ) {
    const weekDays = getWeekDays(startDay, daysInWeek, daysInMonth);
    calendarMonth.push(weekDays);
    startDay = weekDays[weekDays.length - 1] + 1;
  }
  return calendarMonth;
}

const calendarMonth = getCalendarMonth(30, 7, 4);
console.log(calendarMonth);

const newObj = {
  title: 'Menu',
  width: 100,
  height: 200,
  set changeTitle(str) {
    this.title = `${str} ${'Menu'}`;
  },
};
newObj.changeTitle = 'Dinner';

console.log(newObj);
