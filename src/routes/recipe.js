const express = require('express');
const { randomUUID } = require('crypto');
const recipeDao = require('../dao/recipeDao');
const componentDao = require('../dao/componentDao');
const { validateRecipeDto, checkUnsupportedKeys } = require('../schemas/recipeSchema');

const router = express.Router();

router.post('/recipe/create', (req, res) => {
  const dtoIn = req.body;
  const warning = checkUnsupportedKeys(dtoIn);
  const validation = validateRecipeDto(dtoIn);

  if (!validation.valid) {
    return res.status(400).json({ code: validation.code, error: validation.error });
  }

  const recipe = {
    recipeId: randomUUID(),
    title: dtoIn.title.trim(),
    summary: dtoIn.summary.trim(),
    type: dtoIn.type.trim(),
    steps: dtoIn.steps.trim()
  };

  recipeDao.create(recipe);

  const response = { success: true, data: recipe };
  if (warning.hasWarning) {
    response.warning = {
      code: warning.warningCode,
      message: warning.message,
      unsupportedKeys: warning.unsupportedKeys
    };
  }

  res.status(201).json(response);
});

router.get('/recipe/list', (req, res) => {
  const recipes = recipeDao.list();
  res.json(recipes);
});

router.get('/recipe/get', (req, res) => {
  const { id } = req.query;
  if (!id || typeof id !== 'string' || id.trim() === '') {
    return res.status(400).json({ code: 'invalidDtoIn', error: 'DtoIn is not valid.' });
  }

  const recipe = recipeDao.get({ recipeId: id });
  if (!recipe) {
    return res.status(404).json({ code: 'recipeNotFound', error: 'Recipe not found' });
  }

  res.json(recipe);
});

router.put('/recipe/update', (req, res) => {
  const dtoIn = req.body;
  const validation = validateRecipeDto(dtoIn);
  if (!validation.valid) {
    return res.status(400).json({ code: validation.code, error: validation.error });
  }

  if (!dtoIn.recipeId || typeof dtoIn.recipeId !== 'string' || dtoIn.recipeId.trim() === '') {
    return res.status(400).json({ code: 'invalidDtoIn', error: 'DtoIn is not valid.' });
  }

  const existingRecipe = recipeDao.get({ recipeId: dtoIn.recipeId });
  if (!existingRecipe) {
    return res.status(404).json({ code: 'recipeNotFound', error: 'Recipe not found' });
  }

  const recipe = {
    recipeId: dtoIn.recipeId,
    title: dtoIn.title.trim(),
    summary: dtoIn.summary.trim(),
    type: dtoIn.type.trim(),
    steps: dtoIn.steps.trim()
  };

  recipeDao.update(recipe);
  res.json(recipe);
});

router.delete('/recipe/delete', (req, res) => {
  const { id } = req.query;
  if (!id || typeof id !== 'string' || id.trim() === '') {
    return res.status(400).json({ code: 'invalidDtoIn', error: 'DtoIn is not valid.' });
  }

  const recipe = recipeDao.get({ recipeId: id });
  if (!recipe) {
    return res.status(404).json({ code: 'recipeNotFound', error: 'Recipe not found' });
  }

  const components = componentDao.listByRecipe(id);
  components.forEach(c => componentDao.delete(c.componentId));
  recipeDao.delete(id);

  res.status(204).send();
});

module.exports = router;
