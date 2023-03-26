import filterState from '../filterState.js';

function toggleCalendarPanel() {
  filterState.set('calendarVisible', !filterState.get('calendarVisible'));
}

function renderCalendar(container, daysArray, checkinDate, checkoutDate) {
  function renderWeekNames() {
    const daysDivs = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(
      (dayName) => {
        return `<div class="calendar__weekname">${dayName}</div>`;
      },
    );
    return daysDivs.join('');
  }

  function isTheSameDates(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  function isDateInDatesRange(date, startDate, endDate) {
    if (
      date.getTime() < startDate.getTime() ||
      date.getTime() > endDate.getTime()
    ) {
      return false;
    }
    return true;
  }

  function renderWeek(weekDaysArr) {
    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    const daysDivs = weekDaysArr.map(({ date }) => {
      const arrayClassesOfDay = ['calendar__day'];

      if (isTheSameDates(now, date)) {
        arrayClassesOfDay.push('calendar__day--current');
      }
      if (checkinDate && isTheSameDates(date, checkinDate)) {
        arrayClassesOfDay.push('calendar__day--selected-first');
      }
      if (checkoutDate && isTheSameDates(date, checkoutDate)) {
        arrayClassesOfDay.push('calendar__day--selected-last');
      }
      if (
        checkinDate &&
        checkoutDate &&
        isDateInDatesRange(date, checkinDate, checkoutDate)
      ) {
        arrayClassesOfDay.push('calendar__day--selected');
      }
      if (now.getTime() > date.getTime()) {
        arrayClassesOfDay.push('calendar__day--disabled');
      }

      return `<div data-date="${date.getTime()}" class="${arrayClassesOfDay.join(
        ' ',
      )}">${date.getDate()}</div>`;
    });

    return daysDivs.join('');
  }

  function renderMonthWeeks(monthWeekDaysArr) {
    const weeksHtml = [];
    for (let i = 0; i < Math.ceil(monthWeekDaysArr.length / 7); i++) {
      weeksHtml.push(
        `<div class="calendar__week">${renderWeek(
          monthWeekDaysArr.slice(i * 7, i * 7 + 7),
        )}</div>`,
      );
    }

    return weeksHtml.join('');
  }
  const arrayMonth = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = new Date();
  const year = date.getFullYear(); //current year
  const month = date.getMonth(); //current month

  container.innerHTML = `
    <div class="calendar">
        <div class="calendar__month">
            <h4 class="calendar__title">${arrayMonth[month]} ${year}</h4>
            <div class="calendar__weeknames">
            ${renderWeekNames()}
            </div>
            <div class="calendar__weekdays">
            ${renderMonthWeeks(daysArray.slice(0, 35))}
            </div>
        </div>
        <div class="calendar__month">
            <h4 class="calendar__title">${
              arrayMonth[(month + 1) % 12]
            } ${year}</h4>
            <div class="calendar__weeknames">
            ${renderWeekNames()}
            </div>
            <div class="calendar__weekdays">
            ${renderMonthWeeks(daysArray.slice(36))}
            </div>                
        </div>
    </div>
  `;
  for (const element of document.querySelectorAll('.calendar__day')) {
    element.addEventListener('click', (event) => {
      const date = new Date(parseInt(event.target.dataset.date, 10));

      const checkinDate = filterState.get('checkinDate');
      const checkoutDate = filterState.get('checkoutDate');
      if (!checkinDate && !checkoutDate) {
        filterState.set('checkinDate', date);
        return;
      }
      if (!checkoutDate) {
        if (date.getTime() > checkinDate.getTime()) {
          filterState.set('checkoutDate', date);
        } else {
          filterState.set('checkoutDate', checkinDate);
          filterState.set('checkinDate', date);
        }
        return;
      }
      filterState.set('checkinDate', date);
      filterState.set('checkoutDate', null);
    });
  }
}

function render() {
  const inputCalendarIn = document.getElementById('calendar-in');
  const inputCalendarOut = document.getElementById('calendar-out');
  const calendarPanel = document.querySelector('.calendar-panel');
  inputCalendarIn.addEventListener('click', toggleCalendarPanel);
  inputCalendarOut.addEventListener('click', toggleCalendarPanel);

  function updateCalendarInputs() {
    const checkinDate = filterState.get('checkinDate');
    const checkoutDate = filterState.get('checkoutDate');
    inputCalendarIn.value = checkinDate
      ? checkinDate.toLocaleDateString()
      : '-';
    inputCalendarOut.value = checkoutDate
      ? checkoutDate.toLocaleDateString()
      : '-';
  }

  function updateCalendar() {
    renderCalendar(
      calendarPanel,
      filterState.get('calendar'),
      filterState.get('checkinDate'),
      filterState.get('checkoutDate'),
    );
  }

  function updateCalendarVisibility(value) {
    const calendarPanel = document.querySelector('.calendar-panel');
    if (value) {
      calendarPanel.classList.remove('form-panel--hidden');
    } else {
      calendarPanel.classList.add('form-panel--hidden');
    }
  }

  filterState.addChangeEventListener('calendar', updateCalendar);
  filterState.addChangeEventListener('checkinDate', updateCalendar);
  filterState.addChangeEventListener('checkoutDate', updateCalendar);
  filterState.addChangeEventListener('checkinDate', updateCalendarInputs);
  filterState.addChangeEventListener('checkoutDate', updateCalendarInputs);
  filterState.addChangeEventListener(
    'calendarVisible',
    updateCalendarVisibility,
  );

  updateCalendar();
  updateCalendarInputs();
}

export default render;
