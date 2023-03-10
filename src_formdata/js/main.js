import { API_FILES } from './config.js';
const formEl = document.getElementById('js-form');
const imgEl = document.querySelector('.js-img');
const inputEl = formEl.querySelector('input[name=file]');
const imgPreview = document.querySelector('#js-file-preview');

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  const fetchOptions = {
    method: 'POST',
    body: new FormData(formEl),
  };
  const response = await fetch(API_FILES, fetchOptions);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const result = await response.json();
  console.log(result);
});
imgEl.addEventListener('click', () => {
  inputEl.click();
});
const getImagePreview = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      resolve(event.target.result);
    });
    reader.addEventListener('error', (event) => {
      reject(event);
    });
    reader.readAsDataURL(file);
  });
};
inputEl.addEventListener('change', async (event) => {
  if (event.target.files.length !== 0) {
    const file = event.target.files[0];
    const src = await getImagePreview(file);
    imgPreview.setAttribute('src', src);
    imgPreview.setAttribute('alt', file.name);
  } else {
    imgPreview.setAttribute('src', '');
    imgPreview.setAttribute('alt', '');
  }
});
