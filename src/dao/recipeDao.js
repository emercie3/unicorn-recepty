const recipes = require('../data/recipes');

function create(recipe) {
  recipes.push(recipe);
  return recipe;
}

function get(filter) {
  return recipes.find(recipe =>
    Object.entries(filter).every(([key, value]) => recipe[key] === value)
  );
}

function list() {
  return [...recipes];
}

function update(recipe) {
  const index = recipes.findIndex(r => r.recipeId === recipe.recipeId);
  if (index === -1) return null;

  recipes[index] = recipe;
  return recipe;
}

function deleteRecipe(recipeId) {
  const index = recipes.findIndex(r => r.recipeId === recipeId);
  if (index === -1) return false;

  recipes.splice(index, 1);
  return true;
}

module.exports = {
  create,
  get,
  list,
  update,
  delete: deleteRecipe
};
