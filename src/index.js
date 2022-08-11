import _ from 'lodash';
import './style.css';

// display the fetched data
const displayData = (allMeals) => {
  let output = '';
  allMeals.forEach((meal) => {
    output += `<div id="meals-gallery">
          <img src="${meal.strCategoryThumb}" />
                <h3>${meal.strCategory}</h3><h4>Likes (<span>0</span>)
                <i class="fa-regular fa-heart"></i><br>
                <button id="comments">Comment</button>

                </div>`;
  });

  document.getElementById('meal').innerHTML = output;
};

// fetch data from the base API
const getMeals = async () => {
  await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then((res) => res.json())
    .then((data) => {
      displayData(data.categories);
    });
};

document.addEventListener('DOMContentLoaded', getMeals);
