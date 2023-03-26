const listeners = {};

const startDate = new Date();
startDate.setDate(1);
startDate.setDate(-startDate.getDay() + 2);

const filterState = {
  adults: 0,
  children: 0,
  rooms: 0,
  childrenAges: [],

  calendarVisible: false,
  calendar: [...Array(2 * 5 * 7)].map((item, index) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + index);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return {
      date,
    };
  }),

  checkinDate: null, //Object of class Date or null
  checkoutDate: null,

  set(field, value) {
    this[field] = value;
    this.handleStateUpdate(field);
  },

  get(field) {
    return this[field];
  },

  addChangeEventListener(field, listener) {
    if (!listeners[field]) {
      listeners[field] = [];
    }
    listeners[field].push(listener);
  },
  handleStateUpdate(field) {
    const fieldListeners = listeners[field];
    if (!fieldListeners) {
      return;
    }

    for (const listener of fieldListeners) {
      listener(this[field]);
    }
  },
};

export default filterState;
