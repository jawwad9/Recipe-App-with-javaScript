const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');




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
        const botton = document.createElement('button');
        botton.textContent = "View Recire";
        recipeDiv.appendChild(botton);

        recipeContainer.appendChild(recipeDiv);
    })
    
}

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipe(searchInput);
    // console.log('clicked');
    // console.log('clicked');
    // console.log('clicked');
});
