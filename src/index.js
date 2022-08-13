import './style.css';
import {
  findMeals,
  postComments,
  postLikes,
  likesUrl,
} from './modules/getPostData.js';
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
          <i class="fa-solid fa-heart"><br><small id="${meal.idCategory}"class="likes-counter">0 likes</small></i>
        </div>
      
  </div>
  </div>
        `;

    // implement likes section
    const likeBtns = document.querySelectorAll('.fa-heart');
    const likesNo = document.querySelectorAll('.likes-counter');

    likeBtns.forEach((i, index) => {
      i.addEventListener('click', () => {
        likesNo[index].innerHTML = parseInt(likesNo[index].innerHTML, 10) + 1 + `${' ' + 'likes'}`;
        postLikes(index);
      });
    });
  });
  const getLikes = async () => {
    const mealsDiv = document.querySelectorAll('.meal-div');
    const likesNo = document.querySelectorAll('.likes-counter');
    await fetch(likesUrl)
      .then((res) => res.json())
      .then((data) => {
        mealsDiv.forEach((div, index) => {
          data.forEach((food) => {
            if (food.item_id === div.id) {
              likesNo[index].innerHTML = food.likes;
            }
          });
        });
      });
  };
  getLikes();
};

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
