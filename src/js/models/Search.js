class Search {
  constructor(query) {
    this.query = query
  }
  async getResults() {
    try {
      const searchApi = `https://forkify-api.herokuapp.com/api/search?q=${this.query}`
      const response = await fetch(searchApi)
      const data = await response.json()
      this.result = data.recipes
    } catch (error) {
      console.log(error)
    }
  }
}
export default Search
