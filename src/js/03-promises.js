import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

function onFormSubmit(evt) {
  evt.preventDefault();

  let {
    elements: { delay, step, amount },
  } = evt.currentTarget;

  delay = Number(delay.value);
  step = Number(step.value);
  amount = Number(amount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }, delay);
      });
      delay += step;
      }
}



// import Notiflix from 'notiflix';

// const refs = {
//   form: document.querySelector('.form'),
//   delay: document.querySelector('input[name="delay"]'),
//   step: document.querySelector('input[name="step"]'),
//   amount: document.querySelector('input[name="amount"]'),
// };

// refs.form.addEventListener('submit', onSubmirBtnClick);

// function createPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     const shouldResolve = Math.random() > 0.3;
//     if (shouldResolve) {
//       resolve({ position, delay });
//     } else {
//       reject({ position, delay });
//     }
//   });
// }

// function onSubmirBtnClick(event) {
//   event.preventDefault();

//   const firstDelay = Number(refs.delay.value);
//   const step = Number(refs.step.value);
//   const amount = Number(refs.amount.value);
//   let delay = firstDelay;
//   for (let position = 1; position <= amount; position +=1) {
//     createPromise(position, delay)
//       .then(({ position, delay }) =>
//         setTimeout(() => {
//           Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`);
//         }, delay),
//       )
//       .catch(({ position, delay }) =>
//         setTimeout(() => {
//           Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`);
//         }, delay),
//       );
//     delay += step;
//   }
// }

