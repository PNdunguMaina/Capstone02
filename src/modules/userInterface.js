/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
import { findMeals, fetchComments } from './getPostData.js';

const popup = document.querySelector('.meal-details');
const comments = document.querySelector('.comments-container');
const countComments = document.querySelector('.comments-counter');
const form = document.querySelector('form');
const popupWindow = document.getElementById('pop-up');

// create pop-up window
const createPopupWindow = (mealDescription) => {
  const id = mealDescription.idCategory;
  form.setAttribute('data-id', id);
  popup.innerHTML = `
<div class="top-nav">
<div class="image-container">
<img src="${mealDescription.strCategoryThumb}" />
</div>
</div>
<div>
<h2>${mealDescription.strCategory}<h2>
<div class="meal-description">${mealDescription.strCategoryDescription}</div>
`;
};

// create comments container
const commentsContainer = (suggestion) => {
  comments.innerHTML += `
  <li>
      <span class="date">${suggestion.creation_date}</span>
      <span class="name">${suggestion.username}: </span>
      <span class="comment">${suggestion.comment}</span>
  </li>`;
};
// set comments counter
const commentCounter = (comments, elementNode) => {
  if (comments.length) {
    return (elementNode.textContent = comments.length);
  }
  if (!comments.length) {
    return (elementNode.textContent = 0);
  }
};

// Display comment on the screen
const showComments = async (id) => {
  const getComments = await fetchComments(id);
  comments.innerHTML = '';
  countComments.textContent = getComments.length;
  commentCounter(getComments, countComments);

  getComments.find((comment) => commentsContainer(comment));
};

// Display comment on the screen
const displayComment = async (id) => {
  const suggestion = await fetchComments(id);
  comments.innerHTML = '';
  suggestion.find((info) => commentsContainer(info));
};

// Populate selected food
const displayPopUp = async (id) => {
  const allMeals = await findMeals();
  const choice = allMeals.find((item) => item.idCategory === id);
  createPopupWindow(choice);
};

// Open popup model
const openPopup = (modal) => {
  popupWindow.classList.add('active');
};

// Close Popup model
const closePopup = (modal) => {
  popupWindow.classList.remove('active');
};

export {
  displayPopUp,
  showComments,
  openPopup,
  closePopup,
  commentsContainer,
  commentCounter,
};
