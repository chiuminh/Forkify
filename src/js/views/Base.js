const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const elements = {
  searchInput: $('.search__field'),
  searchForm: $('.search'),
  searchRes: $('.results'),
  searchResList: $('.results__list'),
  searchResPages: $('.results__pages')
}

const elementStrings = {
  loader: 'loader'
}
// render loader
const renderLoader = () => {
  let loader = `
    <div class='${elementStrings.loader}'>
      <svg>
        <use href='../assets/img/icons.svg#icon-cw'></use>
      </svg>
    </div>
  `
  elements.searchRes.insertAdjacentHTML('afterBegin', loader)
}

// clear loader
const clearLoader = () => {
  const loaderElement = $(`.${elementStrings.loader}`)
  elements.searchRes.removeChild(loaderElement)
}

export {
  elements,
  renderLoader,
  clearLoader
}