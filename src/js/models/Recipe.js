export default class Recipe {
  constructor(id) {
    this.id = id
  }

  async getRecipe() {
    try {
      const recipeApi = `https://forkify-api.herokuapp.com/api/get?rId=47746`
      const response = await fetch(recipeApi)
      const data = await response.json()
      this.title = data.recipe.title
      this.author = data.recipe.publisher
      this.img = data.image_url
      this.url = data.recipe.source_url
      this.ingredients = data.recipe.ingredients
    } catch (error) {
      console.error(error)
      alert('Somthing went wrong :(')
    }
  }

  calcTime() {
    const numIng = this.ingredients.length
    const periods = Math.ceil(numIng / 3)
    this.time = periods * 15
  }

  calcServings() {
    this.servings = 4
  }

  parseIngredients(){
    const unitsLong = ['tablespoons', 'tablespoon', 'ounce', 'ounces', 'teaspoon', 'teaspoons', 'cups', 'pound']
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'cup', 'pound']
    const newIngredients = this.ingredients.map(el => {
      // 1) Uniform units
      let ingredient = el.toLowerCase()
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i])
      })

      // 2) Remove parentheses
      ingredient = ingredient.replace(/*\([^)]*\) */g, '')

      // 3) Parse ingredients into count, unit and ingredient
      return ingredient
    })
    this.ingredients = newIngredients
  }
}
