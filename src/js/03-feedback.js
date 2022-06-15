
import '../css/common.css';
import '../css/03-feedback.css';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  input: document.querySelector('input'),
};
const formData = {};

populateTextArea();

refs.form.addEventListener('input', throttle(onTextAreaInput, 500));


refs.form.addEventListener('submit', e => {
  e.preventDefault();
  e.currentTarget.reset();
  const objData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    localStorage.removeItem(STORAGE_KEY);
    console.log(objData);    
});

function onTextAreaInput(e) {
  formData.message = refs.textarea.value;
  formData.email = refs.input.value;
  formData[e.target.name] = e.target.value;
  const stringifiedData = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, stringifiedData);

}

function populateTextArea() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedMessage === null) {
    // console.log(savedMessage);
    return;
  }
  refs.input.value = savedMessage['email'] || '';
  refs.textarea.value = savedMessage['message'] || '';
}