import _ from 'lodash';
import './style.css';
import { findMeals, postComments } from './modules/getPostData.js';
import {
  displayPopUp,
  showComments,
  openPopup,
  closePopup,
  commentsContainer,
} from './modules/userInterface.js';

const mealsContainer = document.querySelector('#meal');
const popupWindow = document.getElementById('pop-up');
const form = document.querySelector('form');
const input = document.getElementById('user-name');
const textarea = document.getElementById('suggestion');
const closeBtn = document.querySelector('.close-button');

const displayMeals = async () => {
  const meals = await findMeals();
  meals.forEach((meal) => {
    mealsContainer.innerHTML += `
    <div id="${meal.idCategory}">
      <div class="image-cont">
        <img
          src=${meal.strCategoryThumb}
          alt="food image"
        />
      </div>
      <div>
        <div><p>${meal.strCategory}</p></div>
      <button class="comment-btn" type="button" id="${meal.idCategory}">Comments</button>
  </div>
  </div>
        `;
    document.querySelectorAll('.comment-btn').forEach((button) => {
      button.addEventListener('click', openPopup);
    });
  });
};

mealsContainer.addEventListener('click', (event) => {
  const commentBtn = event.target;
  if (!commentBtn.classList.contains('comment-btn')) return;
  const id = commentBtn.getAttribute('id');
  displayPopUp(id);
  showComments(id);
  openPopup(popupWindow);
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const { id } = event.target.dataset;
  if (input.value && textarea.value) {
    postComments(id, input.value, textarea.value);
    commentsContainer({
      creation_date: '',
      username: input.value,
      comment: textarea.value,
    });
    input.value = '';
    textarea.value = '';
  }
});

closeBtn.addEventListener('click', () => {
  closePopup(popupWindow);
});
displayMeals();

function component() {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
