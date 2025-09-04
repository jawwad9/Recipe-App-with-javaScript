const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContents = document.querySelector('.recipe-details-contents')
const recipeCloseBtn = document.querySelector('.recipe-close-btn')




const fetchRecipe = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipe</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const respones = await data.json();
    // console.log(respones.meals[0]);

    recipeContainer.innerHTML = "";
    respones.meals.forEach( meal => {
        // console.log(meal);
        const recipeDiv = document.createElement('div')
        recipeDiv.classList.add('recipe')
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span>Dish</p>
        <p>Belong to <span>${meal.strCategory} </span>Category</p>
        `

        // create Recipe button 
        const button = document.createElement('button');
        button.textContent = "View Recire";
        recipeDiv.appendChild(button);

        button.addEventListener('click', () => {
            openRecipePopup(meal);
        })

        recipeContainer.appendChild(recipeDiv);
    })

}

// function to fetch Ingredents

const fetchIngredents = (meal) => {
    let ingredentsList = "";
    for (let i=1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredentsList += `<li>${ingredient},${measure}</li>`
        }else{
            break;
        }
    }
    return ingredentsList;
}


const openRecipePopup = (meal) => {
    // console.log(meal);
    recipeDetailsContents.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <h3>Ingredents</h3>
    <ul>${fetchIngredents(meal)}</ul>
    <div>
    <h3>Instructions:</h3>
    <p>${meal.strInstructions}</p>
    </div>
    `

    recipeDetailsContents.parentElement.style.display = "block";
}



searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipe(searchInput);
    // console.log('clicked');
});
