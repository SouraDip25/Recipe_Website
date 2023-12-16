const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContain = document.querySelector(".recipe-details-contain");
const closeBtn = document.querySelector(".recipe-close-btn");
const main = document.querySelector(".main");
const errorimg = document.querySelector(".errorimg");
const search = document.querySelector(".search");
const showerror = document.querySelector(".showerror");
const refresh = document.querySelector(".refresh")

const fetchRecipes = async (query) => {
  errorimg.style.display = "flex";
  showerror.style.display = "none"
  try {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      
    );
    const response = await data.json();
    errorimg.style.display = "none";
    response.meals.forEach((meal) => { 
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");
      recipeDiv.innerHTML = `
         <img src = "${meal.strMealThumb}">
         <h3> ${meal.strMeal} </h3>
         <p><span>${meal.strArea}</span> Dish</p>
         <p>Belongs to <span>${meal.strCategory}</span> Category</p>
         `;
      const button = document.createElement("button");
      button.textContent = "View Recipe";
      recipeContainer.appendChild(recipeDiv);
      recipeDiv.appendChild(button);

      button.addEventListener("click", () => {
        openRecipePopup(meal);
      });
    });
  } catch (error) {
    showerror.style.display = "flex";
  }
};
const fetchIngredients = (meal) => {
  let ingredientList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientList;
};

const openRecipePopup = (meal) => {
  recipeDetailsContain.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents :</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div class="instructions">
      <h3>Instructions : </h3>
      <p>${meal.strInstructions}</p>
    </div>
    `;

  recipeDetailsContain.parentElement.style.display = "block";
};

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  recipeContainer.style.display = "grid";
  main.style.display = "none";
  

  const searchInput = searchBox.value.trim();
  if (!searchInput) {
    recipeContainer.innerHTML = `<h2 class="search">Type the meal in the search box.</h2>`;
    return;
  }
  fetchRecipes(searchInput);
  
 
  
  
});

closeBtn.addEventListener("click", (e) => {
  recipeDetailsContain.parentElement.style.display = "none";
});


refresh.addEventListener("click",()=>{
  document.location.reload(true)
})
