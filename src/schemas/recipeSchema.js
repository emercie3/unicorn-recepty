const ALLOWED_FIELDS = ['recipeId', 'title', 'summary', 'type', 'steps'];

function validateRecipeDto(dtoIn) {
  if (!dtoIn || typeof dtoIn !== 'object') {
    return { valid: false, code: 'invalidDtoIn', error: 'DtoIn is not valid.' };
  }

  const { recipeId, title, summary, type, steps } = dtoIn;

  if (recipeId !== undefined && typeof recipeId !== 'string') {
    return { valid: false, code: 'invalidDtoIn', error: 'recipeId must be a string.' };
  }

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return { valid: false, code: 'invalidDtoIn', error: 'Title is required and must be a non-empty string.' };
  }

  if (!summary || typeof summary !== 'string' || summary.trim() === '') {
    return { valid: false, code: 'invalidDtoIn', error: 'Summary is required and must be a non-empty string.' };
  }

  if (!type || typeof type !== 'string' || type.trim() === '') {
    return { valid: false, code: 'invalidDtoIn', error: 'Type is required and must be a non-empty string.' };
  }

  if (!steps || typeof steps !== 'string' || steps.trim() === '') {
    return { valid: false, code: 'invalidDtoIn', error: 'Steps are required and must be a non-empty string.' };
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
  validateRecipeDto,
  checkUnsupportedKeys,
  ALLOWED_FIELDS
};
