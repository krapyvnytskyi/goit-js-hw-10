// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('button[data-start]');
const daysLeft = document.querySelector('.value[data-days]');
const hoursLeft = document.querySelector('.value[data-hours]');
const minutesLeft = document.querySelector('.value[data-minutes]');
const secondsLeft = document.querySelector('.value[data-seconds]');

let userSelectedDate;

startBtn.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      userSelectedDate = selectedDate;
    }
  },
};

flatpickr('#datetime-picker', options);

class Timer {
  constructor({ onTick }) {
    this.onTick = onTick;
    this.isActive = false;
    this.intervalId = null;
    this.userSelectedDate = null;

    this.init();
  }

  init() {
    const time = this.getTime(0);
    this.onTick(time);
  }

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = userSelectedDate - currentTime;

      if (deltaTime <= 0) {
        this.stop();
        return;
      }
      const time = this.getTime(deltaTime);

      this.onTick(time);
    }, 1000);
  }

  getTime(time) {
    const seconds = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));

    return { days, hours, mins, seconds };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer({
  onTick: updateClockface,
});

startBtn.addEventListener('click', timer.start.bind(timer));

function updateClockface({ days, hours, mins, seconds }) {
  daysLeft.innerHTML = `${days}`;
  hoursLeft.innerHTML = `${hours}`;
  minutesLeft.innerHTML = `${mins}`;
  secondsLeft.innerHTML = `${seconds}`;
}

startBtn.addEventListener('click', () => {
  timer.start();
  startBtn.disabled = true; // Делаем кнопку неактивной после нажатия
});
