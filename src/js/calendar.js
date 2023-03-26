//определяем количество дней в текущем месяце
Date.prototype.daysInMonth = function () {
  return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
};

const date = new Date();
// console.log(date.daysInMonth());
const year = date.getFullYear(); //текущий год
const month = date.getMonth(); //текущий месяц
console.log('текущий месяц', month);
// количество дней в следующем месяце
Date.prototype.daysInMonth1 = function () {
  return 32 - new Date(this.getFullYear(), this.getMonth() + 1, 32).getDate();
};
console.log('количество дней в следующем месяце', date.daysInMonth1());
const firstDayDate = new Date(year, month, 1);
// const previousDate = new Date(year, month, 0);
// const dayInPreviousMonth = previousDate.getDate(); //количество дней в предыдущем месяце.
// console.log(dayInPreviousMonth);
const dayOfWeek = firstDayDate.getDay(); // определим  день недели на первое число
const currentDay = date.getDate();
console.log(currentDay);
console.log(dayOfWeek);
// const startDay = dayInPreviousMonth - dayOfWeek + 2; //дата с которой должен начаться календарь
// console.log(startDay);

//количество недель в месяце (а значит в календаре)
const calcWeeksCount = (daysInMonth, daysInWeek, dayOfWeek) => {
  return Math.ceil((dayOfWeek + daysInMonth) / daysInWeek);
};
console.log(calcWeeksCount(date.daysInMonth(), 7, dayOfWeek));

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

  for (let i = 0; i < calendarMonth.length; i++) {
    for (let j = 0; j < calendarMonth[i].length; j++) {
      const currDay = calendarMonth[i][j];
      if (
        currDay.dayOfMonth === currentDay &&
        currDay.notCurrentMonth === false
      ) {
        currDay.currentDay = true;
      } else {
        currDay.currentDay = false;
      }
    }
  }

  return calendarMonth;
}

const calendarMonth = getCalendarMonth(date.daysInMonth(), 7, dayOfWeek, [
  { dayOfMonth: 29, notCurrentMonth: true },
  { dayOfMonth: 2, notCurrentMonth: false },
]);
console.log(calendarMonth);
