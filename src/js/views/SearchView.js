import { elements } from './Base.js'
const getSearchValue = () => elements.searchInput.value

// clear search input 
const clearSearch = () => {
  elements.searchInput.value = ''
}

// clear result
const clearResult = () => {
  elements.searchResPages.innerHTML = ''
  elements.searchResList.innerHTML = ''
}

// Pasta with tomato and spinach
const limitRecipeTitle = (title, limit = 18) => {
  const newTitle = []
  if (newTitle.length < limit) {
    title.split('').reduce((acc, curr) => {
      if (acc + curr.length < limit) {
        newTitle.push(curr)
      }
      return acc + curr.length
    }, 0)
  }
  return `${newTitle.join('')}...`
}

// render recipe
const renderRecipe = (recipe) => {
  const htmls = `
    <li>
      <a class="results__link results__link--active" href="#${recipe.recipe_id}">
          <figure class="results__fig">
              <img src="${recipe.image_url}" alt="${limitRecipeTitle(recipe.title)}">
          </figure>
          <div class="results__data">
              <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
              <p class="results__author">${recipe.publisher}</p>
          </div>
      </a>
    </li>
  `
  elements.searchResList.insertAdjacentHTML('afterBegin', htmls)
}

// 1, 2, 3, 4, 5, 6, 7, 8
// step = 3
// page = 1: start = 0; end = 3 => render button right
// page = 2: start = 3; end = 6 => both buttons
// page = 3: start = 6; end = 8 => render button left

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type === 'prev' ? 'prev' : 'next'}" data-goto='${type === 'prev' ? page - 1 : page + 1}'>
      <svg class="search__icon">
          <use href="../assets/img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
      </svg>
      <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>`

// render Button 
const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage)
  let button
  // Only button to go to next page
  if (page === 1 && pages > 1) {
    button = createButton(page, 'next')
  }
  // Both buttons
  else if (page > 1) {
    button = `
      ${createButton(page, 'next')}
      ${createButton(page, 'prev')}
    `
  }
  // Only button to go to nest page
  else if (page === pages && pages > 1) {
    button = createButton(page, 'prev')
  }
  return elements.searchResPages.insertAdjacentHTML('afterBegin', button)
}

const renderResult = (recipes, page = 1, resPerPage = 8) => {
  let start = (page - 1) * resPerPage
  let end = page * resPerPage

  recipes.slice(start, end).forEach(renderRecipe)
  renderButtons(page, recipes.length, resPerPage)
}

export {
  getSearchValue,
  renderResult,
  clearResult,
  clearSearch,
}
