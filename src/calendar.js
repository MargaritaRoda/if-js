const calcWeeksCount = (daysInMonth, daysInWeek, dayOfWeek) => {
  return Math.ceil((dayOfWeek + daysInMonth) / daysInWeek);
};
console.log(calcWeeksCount(30, 7, 6));

const getWeekDays = function (startDay, daysInWeek, daysInMonth, firstWeek) {
  const week = [];
  for (
    let currentDay = startDay;
    currentDay < startDay + daysInWeek;
    currentDay += 1
  ) {
    if (currentDay > daysInMonth) {
      week.push({
        dayOfMonth: currentDay - daysInMonth,
        notCurrentMonth: !firstWeek,
      });
    } else {
      week.push({
        dayOfMonth: currentDay,
        notCurrentMonth: firstWeek,
      });
    }
  }
  return week;
};

function getCalendarMonth(daysInMonth, daysInWeek, dayOfWeek, period) {
  if (dayOfWeek + 1 > daysInWeek) {
    throw Error('Day of week is greater than week days count');
  }
  const [checkInDay, checkOutDay] = period;

  const calendarMonth = [];
  let startDay = daysInMonth - dayOfWeek + 1;

  for (
    let i = 0;
    i < calcWeeksCount(daysInMonth, daysInWeek, dayOfWeek);
    i += 1
  ) {
    const firstWeek = i === 0;
    const weekDays = getWeekDays(startDay, daysInWeek, daysInMonth, firstWeek);
    calendarMonth.push(weekDays);
    startDay = weekDays[weekDays.length - 1].dayOfMonth + 1;
  }

  for (let i = 0; i < calendarMonth.length; i++) {
    for (let j = 0; j < calendarMonth[i].length; j++) {
      const currentDayOfWeek = calendarMonth[i][j];

      if (
        (currentDayOfWeek.dayOfMonth === checkInDay.dayOfMonth &&
          currentDayOfWeek.notCurrentMonth === checkInDay.notCurrentMonth) ||
        (currentDayOfWeek.dayOfMonth === checkOutDay.dayOfMonth &&
          currentDayOfWeek.notCurrentMonth === checkOutDay.notCurrentMonth)
      ) {
        currentDayOfWeek.selectedDay = true;
      } else {
        currentDayOfWeek.selectedDay = false;
      }
    }
  }
  const flatCalendarMonth = [];
  for (let i = 0; i < calendarMonth.length; i++) {
    for (let j = 0; j < calendarMonth[i].length - 1; j++) {
      flatCalendarMonth.push(calendarMonth[i][j]);
    }
  }
  for (let i = 1; i < flatCalendarMonth.length; i++) {
    const prevDay = flatCalendarMonth[i - 1];
    const currDay = flatCalendarMonth[i];
    const nextDay = flatCalendarMonth[i + 1];
    if (prevDay.selectedDay) {
      currDay.selectedDay = true;
    }
    if (
      nextDay.dayOfMonth === checkOutDay.dayOfMonth &&
      nextDay.notCurrentMonth === checkOutDay.notCurrentMonth
    ) {
      break;
    }
  }

  return calendarMonth;
}

const calendarMonth = getCalendarMonth(30, 7, 4, [
  { dayOfMonth: 29, notCurrentMonth: true },
  { dayOfMonth: 2, notCurrentMonth: false },
]);
console.log(calendarMonth);
