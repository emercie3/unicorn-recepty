const components = require('../data/components');

function create(component) {
  components.push(component);
  return component;
}

function get(filter) {
  return components.find(component =>
    Object.entries(filter).every(([key, value]) => component[key] === value)
  );
}

function list() {
  return [...components];
}

function update(component) {
  const index = components.findIndex(c => c.componentId === component.componentId);
  if (index === -1) return null;

  components[index] = component;
  return component;
}

function deleteComponent(componentId) {
  const index = components.findIndex(c => c.componentId === componentId);
  if (index === -1) return false;

  components.splice(index, 1);
  return true;
}

function listByRecipe(recipeId) {
  return components.filter(component => component.recipeId === recipeId);
}

module.exports = {
  create,
  get,
  list,
  update,
  delete: deleteComponent,
  listByRecipe
};
