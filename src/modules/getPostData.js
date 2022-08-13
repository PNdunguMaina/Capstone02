const mealUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php';
const baseUrl =
  'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
const appId = 'VLkvQrH2CamIWyKQoVQw';
const commentUrl = `${baseUrl}apps/${appId}/comments?item_id=`;
const postCommentUrl = `${baseUrl}apps/${appId}/comments`;
const likesUrl = `${baseUrl}apps/${appId}/likes`;

// fetch food details from the base API
const findMeals = async () => {
  const response = await fetch(mealUrl);
  const { categories: food } = await response.json();
  return food;
};

// fetch comment details from the involvement API
const fetchComments = async (id) => {
  const response = await fetch(commentUrl + id);
  const allComments = await response.json();
  return allComments;
};

// post comment details to the involvement API
const postComments = async (id, name, suggestion) => {
  await fetch(postCommentUrl, {
    method: 'POST',
    body: JSON.stringify({
      item_id: id,
      username: name,
      comment: suggestion,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((data) => data.json());
};

// post number of like to the involvement API
const postLikes = async (id) => {
  await fetch(likesUrl, {
    method: 'POST',
    body: JSON.stringify({
      item_id: id,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  // }).then((data) => data.json());
};

// get likes from the involvement API
const getLikes = async () => {
  const mealsDiv = document.querySelectorAll('.meal-div');
  const likesNo = document.querySelectorAll('.likes-counter');
  await fetch(
    'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/VLkvQrH2CamIWyKQoVQw/likes/'
  )
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

export {
  findMeals,
  fetchComments,
  postComments,
  postLikes,
  likesUrl,
  getLikes,
};
