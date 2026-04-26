const ALLOWED_FIELDS = ['componentId', 'recipeId', 'label', 'amount', 'unit'];

function validateComponentDto(dtoIn) {
  if (!dtoIn || typeof dtoIn !== 'object') {
    return { valid: false, code: 'invalidDtoIn', error: 'DtoIn is not valid.' };
  }

  const { componentId, recipeId, label, amount, unit } = dtoIn;

  if (componentId !== undefined && typeof componentId !== 'string') {
    return { valid: false, code: 'invalidDtoIn', error: 'componentId must be a string.' };
  }

  if (!recipeId || typeof recipeId !== 'string' || recipeId.trim() === '') {
    return { valid: false, code: 'invalidDtoIn', error: 'recipeId is required and must be a non-empty string.' };
  }

  if (!label || typeof label !== 'string' || label.trim() === '') {
    return { valid: false, code: 'invalidDtoIn', error: 'Label is required and must be a non-empty string.' };
  }

  if (amount === undefined || typeof amount !== 'number' || Number.isNaN(amount)) {
    return { valid: false, code: 'invalidDtoIn', error: 'Amount is required and must be a number.' };
  }

  if (!unit || typeof unit !== 'string' || unit.trim() === '') {
    return { valid: false, code: 'invalidDtoIn', error: 'Unit is required and must be a non-empty string.' };
  }

  return { valid: true };
}

function checkUnsupportedKeys(dtoIn) {
  const unsupportedKeys = Object.keys(dtoIn).filter(key => !ALLOWED_FIELDS.includes(key));
  if (unsupportedKeys.length === 0) {
    return { hasWarning: false };
  }

  return {
    hasWarning: true,
    warningCode: 'UNSUPPORTED_KEYS',
    message: `Unsupported keys detected and ignored: ${unsupportedKeys.join(', ')}`,
    unsupportedKeys
  };
}

module.exports = {
  validateComponentDto,
  checkUnsupportedKeys,
  ALLOWED_FIELDS
};
