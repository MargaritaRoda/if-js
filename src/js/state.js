const listeners = {};

const state = {
  adults: 0,
  children: 0,
  rooms: 0,
  childrenAges: [],

  set(name, value) {
    this[name] = value;
    this.handleStateUpdate(name);
  },

  get(name) {
    return this[name];
  },

  addChangeEventListener(field, listener) {
    if (!listeners[field]) {
      listeners[field] = [];
    }
    listeners[field].push(listener);
  },
  handleStateUpdate(changedField) {
    const fieldListeners = listeners[changedField];
    if (!fieldListeners) {
      return;
    }

    for (const listener of fieldListeners) {
      listener(this[changedField]);
    }
  },
};

export default state;
