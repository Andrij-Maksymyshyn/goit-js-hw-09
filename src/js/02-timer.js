import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const input = document.querySelector('#datetime-picker');
const button = document.querySelector('button[data-start]');
const daysA = document.querySelector('[data-days]');
const hoursA = document.querySelector('[data-hours]');
const minutesA = document.querySelector('[data-minutes]');
const secondsA = document.querySelector('[data-seconds]');

button.addEventListener('click', onBtnStartClick);

 
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
     if (Date.now() < selectedDates[0].getTime()) {
      button.removeAttribute('disabled');

    } else {
      Notify.failure('Please choose a date in the future');
      button.setAttribute('disabled', 'true');
          } 
  },
  };

const fl = flatpickr(input, options);
let intervalId = null;

function onBtnStartClick() {
  const checkedDate = fl.selectedDates[0];  
    
    if (checkedDate <= Date.now()) {
      clearInterval(intervalId);
          } else {    
      intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = checkedDate - currentTime;
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      updateTime({ days, hours, minutes, seconds });
              }, 1000);
         button.setAttribute('disabled', 'true');
         input.setAttribute('disabled', 'true');
        };
      };

      function updateTime({ days, hours, minutes, seconds }) {
        daysA.textContent = `${days}`;
        hoursA.textContent = `${hours}`;
        minutesA.textContent = `${minutes}`;
        secondsA.textContent = `${seconds}`;
      }

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};

