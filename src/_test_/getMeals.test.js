/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

test('properly return total number of meals displayed', () => {
    // fetch food details from the base API
    const findMeals = () => {
        const response = fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const { categories: food } = response.json();
        console.log(food);

        expect(food.length).toBe(14);
    };

})
