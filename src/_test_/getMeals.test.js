/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

test('properly return total number of meals displayed', () => {
  const findMeals = () => {
    const response = fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const { categories: food } = response.json();
    const length = food.length;
    console.log(length);
    expect(findMeals()).toBe(14);
    };    
})
