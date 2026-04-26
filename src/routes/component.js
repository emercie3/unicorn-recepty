const express = require('express');
const { randomUUID } = require('crypto');
const componentDao = require('../dao/componentDao');
const recipeDao = require('../dao/recipeDao');
const { validateComponentDto, checkUnsupportedKeys } = require('../schemas/componentSchema');

const router = express.Router();

router.post('/component/create', (req, res) => {
  const dtoIn = req.body;
  const warning = checkUnsupportedKeys(dtoIn);
  const validation = validateComponentDto(dtoIn);

  if (!validation.valid) {
    return res.status(400).json({ code: validation.code, error: validation.error });
  }

  const recipe = recipeDao.get({ recipeId: dtoIn.recipeId });
  if (!recipe) {
    return res.status(404).json({ code: 'recipeNotFound', error: 'Recipe not found' });
  }

  const component = {
    componentId: randomUUID(),
    recipeId: dtoIn.recipeId,
    label: dtoIn.label.trim(),
    amount: dtoIn.amount,
    unit: dtoIn.unit.trim()
  };

  componentDao.create(component);

  const response = { success: true, data: component };
  if (warning.hasWarning) {
    response.warning = {
      code: warning.warningCode,
      message: warning.message,
      unsupportedKeys: warning.unsupportedKeys
    };
  }

  res.status(201).json(response);
});

router.get('/component/list', (req, res) => {
  const { recipeId } = req.query;
  if (recipeId) {
    return res.json(componentDao.listByRecipe(recipeId));
  }

  res.json(componentDao.list());
});

router.get('/component/get', (req, res) => {
  const { id } = req.query;
  if (!id || typeof id !== 'string' || id.trim() === '') {
    return res.status(400).json({ code: 'invalidDtoIn', error: 'DtoIn is not valid.' });
  }

  const component = componentDao.get({ componentId: id });
  if (!component) {
    return res.status(404).json({ code: 'componentNotFound', error: 'Component not found' });
  }

  res.json(component);
});

router.put('/component/update', (req, res) => {
  const dtoIn = req.body;
  const validation = validateComponentDto(dtoIn);
  if (!validation.valid) {
    return res.status(400).json({ code: validation.code, error: validation.error });
  }

  if (!dtoIn.componentId || typeof dtoIn.componentId !== 'string' || dtoIn.componentId.trim() === '') {
    return res.status(400).json({ code: 'invalidDtoIn', error: 'DtoIn is not valid.' });
  }

  const existing = componentDao.get({ componentId: dtoIn.componentId });
  if (!existing) {
    return res.status(404).json({ code: 'componentNotFound', error: 'Component not found' });
  }

  const recipe = recipeDao.get({ recipeId: dtoIn.recipeId });
  if (!recipe) {
    return res.status(404).json({ code: 'recipeNotFound', error: 'Recipe not found' });
  }

  const component = {
    componentId: dtoIn.componentId,
    recipeId: dtoIn.recipeId,
    label: dtoIn.label.trim(),
    amount: dtoIn.amount,
    unit: dtoIn.unit.trim()
  };

  componentDao.update(component);
  res.json(component);
});

router.delete('/component/delete', (req, res) => {
  const { id } = req.query;
  if (!id || typeof id !== 'string' || id.trim() === '') {
    return res.status(400).json({ code: 'invalidDtoIn', error: 'DtoIn is not valid.' });
  }

  const existing = componentDao.get({ componentId: id });
  if (!existing) {
    return res.status(404).json({ code: 'componentNotFound', error: 'Component not found' });
  }

  componentDao.delete(id);
  res.status(204).send();
});

module.exports = router;
