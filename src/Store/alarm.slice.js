import { createSlice } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';

const alarmSlice = createSlice({
  name: 'alarm',
  initialState: () => {
    const localStorage = window.localStorage.getItem('alarm');

    if (localStorage) return JSON.parse(localStorage);
    return {
      alarms: [],
      format: 'hh:mm:ss'
    };
  },
  reducers: {
    removeAlarm(state, { payload: { index } }) {
      state.alarms.splice(index, 1);
    },
    addAlarm(state, { payload: { time } }) {
      try {
        DateTime.fromISO(time);
        state.alarms = [...state.alarms, time];
      } catch (error) {
        alert('Invalid time.');
      }

      state.alarms = state.alarms.sort((x, y) => {
        const timeX = DateTime.fromISO(x);
        const timeY = DateTime.fromISO(y);
        const now = DateTime.now();

        const i = timeX - now;
        const j = timeY - now;

        if (i * j < 0 && i < 0) return 1;
        if (i * j < 0 && i > 0) return -1;
        return timeX - timeY;
      });

      window.localStorage.setItem('alarm', JSON.stringify(state));
    },
    changeFormat(state, { payload: { format } }) {
      state.format = format;
      window.localStorage.setItem('alarm', JSON.stringify(state));
    },
    clearDue(state, _) {
      state.alarms = state.alarms.filter((x) => DateTime.now() - DateTime.fromISO(x) < 0);
      window.localStorage.setItem('alarm', JSON.stringify(state));
    },
    sort(state, _) {
      state.alarms = state.alarms.sort((x, y) => {
        const timeX = DateTime.fromISO(x);
        const timeY = DateTime.fromISO(y);
        const now = DateTime.now();

        const i = timeX - now;
        const j = timeY - now;

        if (i * j < 0 && i < 0) return 1;
        if (i * j < 0 && i > 0) return -1;
        return timeX - timeY;
      });
      window.localStorage.setItem('alarm', JSON.stringify(state));
    }
  }
});

export const { removeAlarm, addAlarm, changeFormat, clearDue, sort } = alarmSlice.actions;
export default alarmSlice.reducer;
