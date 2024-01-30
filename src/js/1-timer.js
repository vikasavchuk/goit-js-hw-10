import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate;
let intervalId = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      iziToast.show({
        message: 'Please choose a date in the future',
        color: 'red',
        position: 'topCenter',
      });
    } else {
      startBtn.disabled = false;
      userSelectedDate = selectedDates[0].getTime();
      inputEl.disabled = true;
    }
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  intervalId = setInterval(() => {
    const differenceInTime = userSelectedDate - new Date();

    if (differenceInTime < 1000) {
      clearInterval(intervalId);
      inputEl.disabled = false;
    }
    const result = convertMs(differenceInTime);
    viewOfTimer(result);
  }, 1000);
  
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function viewOfTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`.padStart(2, '0');
  hoursEl.textContent = `${hours}`.padStart(2, '0');
  minutesEl.textContent = `${minutes}`.padStart(2, '0');
  secondsEl.textContent = `${seconds}`.padStart(2, '0');
}