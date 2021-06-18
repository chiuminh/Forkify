import Search from './models/Search.js'
import Recipe from './models/Recipe.js'

import { clearLoader, elements, renderLoader } from './views/Base.js'
import * as SearchView from './views/SearchView.js'

const state = {}

/**
 * SEARCH CONTROLLER
 */
const SearchControl = async () => {
  //1. get query from search view
  const query = SearchView.getSearchValue()

  //2. new search object and add to state
  const search = new Search(query)
  state.search = search

  //3. prepare UI for results
  SearchView.clearSearch()
  SearchView.clearResult()
  renderLoader()

  try {
    //4. search for recipes
    await state.search.getResults()

    //5. render result on UI
    clearLoader()
    SearchView.renderResult(state.search.result)
  } catch (error) {
    alert('Error processing search!')
  }

}

elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault()
  SearchControl()
})

window.addEventListener('load', (e) => {
  e.preventDefault()
  SearchControl()
})


elements.searchResPages.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-inline')
  if (btn) {
    const gotoPage = +btn.dataset.goto
    SearchView.clearResult()
    SearchView.renderResult(state.search.result, gotoPage)
  }
})

/**
 * RECIPE CONTROLLER
 */
const RecipeControl = async () => {
  // Get Id from UI
  const id = window.location.hash.replace('#', '')
  if (id) {
    // prepare ui for changes
    // create new recipe object
    state.recipe = new Recipe(id)
    try {
      // get recipe data
      await state.recipe.getRecipe()

      // calculate servings and time
      state.recipe.calcTime()
      state.recipe.calcServings()

      // render recipe
      console.log(state.recipe)
    } catch (error) {
      alert('Error processing recipe!')
    }
  }
}
// window.addEventListener('hashchange', RecipeControl)
// window.addEventListener('load', RecipeControl)

['hashchange', 'load'].forEach(event => window.addEventListener(event, RecipeControl))