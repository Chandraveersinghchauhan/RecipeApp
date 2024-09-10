const searchbtn = document.querySelector(".searchbtn");
const searchbox = document.querySelector(".searchbox");
const recipecontainer = document.querySelector(".recipe-container");
const recipedetailcontent = document.querySelector(".recipe-detail-content");
const recipeclosebtn = document.querySelector(".recipe-closebtn");

const fetchrecipes = async (searchname) => {
  try {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchname}`
    );
    const response = await data.json();
    recipecontainer.innerHTML = "";
    response.meals.forEach((meal) => {
      const recipediv = document.createElement("div");
      recipediv.classList.add("recipe");
      recipediv.innerHTML = `<img src="${meal.strMealThumb}">
      <h3>${meal.strMeal}</h3>
      <p><span>${meal.strArea} </span>Dish</p>
      <p>Belongs to <span>${meal.strCategory}</span> Category</p>`;

      const button = document.createElement("button");
      button.textContent = "View Recipesss";
      recipediv.appendChild(button);

      button.addEventListener("click", () => {
        openrecipepopup(meal);
      });

      recipecontainer.appendChild(recipediv);
    });
  } catch (error) {
    recipecontainer.innerHTML = "<h2> Error in fetching recipes....</h2>";
  }
};

const openrecipepopup = (meal) => {
  recipedetailcontent.innerHTML = `
  <h2 class="recipename">${meal.strMeal}</h2>
  <h3>Ingredient:</h3>
  <ul class="ingredientlist">${fetchingredient(meal)}</ul>
  <div class="recipeinstructions">
  <h3>Instructions:</h3>
  <p >${meal.strInstructions}</p>
  
  </div>
  
  `;

  recipedetailcontent.parentElement.style.display = "block";
};

const fetchingredient = (meal) => {
  console.log(meal);
  let ingredientslist = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientslist += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientslist;
};

recipeclosebtn.addEventListener("click", () => {
  recipedetailcontent.parentElement.style.display = "none";
});

searchbtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchinput = searchbox.value.trim();
  if (!searchinput) {
    recipecontainer.innerHTML = "<h2>Type the meal in searchbbox</h2>";
    return;
  }
  fetchrecipes(searchinput);
});
