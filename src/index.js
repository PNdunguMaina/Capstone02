/* eslint-disable no-useless-concat */
/* eslint-disable prefer-template */

import './style.css';
import {
  findMeals,
  postComments,
  getLikes,
} from './modules/getPostData.js';
import {
  displayPopUp,
  showComments,
  openPopup,
  closePopup,
  commentsContainer,
} from './modules/userInterface.js';
import mealCounter from './modules/mealCounter.js';

const mealsContainer = document.querySelector('#meal');
const popupWindow = document.getElementById('pop-up');
const form = document.querySelector('form');
const input = document.getElementById('user-name');
const textarea = document.getElementById('suggestion');
const closeBtn = document.querySelector('.close-button');
const mealDiv = document.querySelector('#meal-container');
const totalMeals = document.querySelector('.total-meals');


const displayMeals = async () => {
  const meals = await findMeals();
  mealCounter(meals, totalMeals);
  meals.forEach((meal) => {
    mealsContainer.innerHTML += `
    <div id="${meal.idCategory}" class="meal-div">
      <div class="image-cont">
        <img
          src=${meal.strCategoryThumb}
          alt="food image"
        />
      </div>
      <div>
        <div><p>${meal.strCategory}</p></div>
        <div class="home-btns">
          <button class="comment-btn" type="button" id="${meal.idCategory}">Comments</button>
          <i id="${meal.idCategory}" class="fa-solid fa-heart"></i><small class="likes-counter">0</small> likes
        </div>
      
  </div>
  </div>
        `
    mealDiv.append(mealsContainer);
  });

  // implement likes section
  const likeBtns = document.querySelectorAll('.fa-heart');
  const likesNo = document.querySelectorAll('.likes-counter');

  likeBtns.forEach((i, index) => {
    i.addEventListener('click', () => {
      likesNo[index].innerHTML = `${parseInt(likesNo[index].innerHTML, 10) + 1}`;
      fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/VLkvQrH2CamIWyKQoVQw/likes/', {
        method: 'POST',
        body: JSON.stringify({
          item_id: i.id,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    });

  });
  getLikes();
}

mealsContainer.addEventListener('click', (event) => {
  const commentBtn = event.target;
  if (commentBtn.classList.contains('comment-btn')) {
    const id = commentBtn.getAttribute('id');
    displayPopUp(id);
    showComments(id);
    openPopup(popupWindow);
  }
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
