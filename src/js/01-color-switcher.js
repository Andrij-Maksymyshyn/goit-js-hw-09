const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');

let timeId = null;

start.addEventListener('click', onStartClick);
stop.addEventListener('click', onStopClick);

function onStartClick() {
  timeId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
      }, 1000);
      start.setAttribute('disabled', 'true');
      stop.removeAttribute('disabled');
           }; 

function onStopClick() {
  clearInterval(timeId);
  stop.setAttribute('disabled', 'true');
  start.removeAttribute('disabled');
   };

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
