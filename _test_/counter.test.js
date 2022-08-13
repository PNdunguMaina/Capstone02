/* eslint-disable no-undef */
import commentsDescription from '../_mocks_/comments.js';
import mealDescription from '../_mocks_/meals.js';
import mealCounter from '../src/modules/mealCounter.js';
import { commentCounter } from '../src/modules/userInterface.js';

describe('properly count the number of meals', () => {
  test('get total number of elements in an array', () => {
    document.body.innerHTML = '<h1>Best Meals (<span class="total-meals"></span>)</h1>';
    const totalMeals = document.querySelector('.total-meals');
    expect(mealCounter(mealDescription, totalMeals)).toBe(4);
  });
});

describe('properly get the total number of comments', () => {
  document.body.innerHTML = `<h2>Comments (<small class='comments-counter'>0</small>)</h2>`;
  const commentsNo = document.querySelector('.comments-counter');
  test('get correct number of comments', () => {
    expect(commentCounter(commentsDescription, commentsNo)).toBe(3);
  });
});
