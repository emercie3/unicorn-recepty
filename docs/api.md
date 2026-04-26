# Unicorn Recipes Backend API

## Overview
This backend provides recipe and component management with CRUD operations and validation following the provided design.

## Base URL
`http://localhost:3000`

## Data Models

### CookingRecipe
```json
{
  "recipeId": "string",
  "title": "string",
  "summary": "string",
  "type": "string",
  "steps": "string"
}
```

### Component
```json
{
  "componentId": "string",
  "recipeId": "string",
  "label": "string",
  "amount": "number",
  "unit": "string"
}
```

## Recipe Endpoints

### POST /recipe/create
Create a new recipe.

**Request Body:**
```json
{
  "title": "Recipe Title",
  "summary": "Brief description",
  "type": "Main course",
  "steps": "Mix ingredients and cook."
}
```

**Success Response:**
- 201 Created
```json
{
  "success": true,
  "data": {
    "recipeId": "string (UUID)",
    "title": "Recipe Title",
    "summary": "Brief description",
    "type": "Main course",
    "steps": "Mix ingredients and cook."
  }
}
```

**Warning Response:** unsupported keys are ignored.
```json
{
  "success": true,
  "data": { /* recipe data */ },
  "warning": {
    "code": "UNSUPPORTED_KEYS",
    "message": "Unsupported keys detected and ignored: extraField1",
    "unsupportedKeys": ["extraField1"]
  }
}
```

**Error Responses:**
- 400 invalidDtoIn

### GET /recipe/list
Return all recipes.

**Success Response:**
- 200 OK: Array of recipes

### GET /recipe/get?id={id}
Return recipe by ID.

**Query Parameters:**
- `id` (required)

**Error Responses:**
- 400 invalidDtoIn
- 404 recipeNotFound

### PUT /recipe/update
Update an existing recipe.

**Request Body:**
```json
{
  "recipeId": "string",
  "title": "Updated title",
  "summary": "Updated summary",
  "type": "Updated type",
  "steps": "Updated steps"
}
```

**Error Responses:**
- 400 invalidDtoIn
- 404 recipeNotFound

### DELETE /recipe/delete?id={id}
Delete recipe and related components.

**Query Parameters:**
- `id` (required)

**Error Responses:**
- 400 invalidDtoIn
- 404 recipeNotFound

## Component Endpoints

### POST /component/create
Create a new component.

**Request Body:**
```json
{
  "recipeId": "string",
  "label": "Tomato",
  "amount": 2,
  "unit": "pcs"
}
```

**Success Response:**
- 201 Created

### GET /component/list
Return all components.

**Optional Query Parameters:**
- `recipeId`: filter components by recipe

### GET /component/get?id={id}
Return component by ID.

**Error Responses:**
- 400 invalidDtoIn
- 404 componentNotFound

### PUT /component/update
Update a component.

**Request Body:**
```json
{
  "componentId": "string",
  "recipeId": "string",
  "label": "Tomato",
  "amount": 2,
  "unit": "pcs"
}
```

**Error Responses:**
- 400 invalidDtoIn
- 404 componentNotFound
- 404 recipeNotFound

### DELETE /component/delete?id={id}
Delete component.

**Error Responses:**
- 400 invalidDtoIn
- 404 componentNotFound

## Error Responses

### invalidDtoIn
Returned when input validation fails.

Example:
```json
{
  "code": "invalidDtoIn",
  "error": "DtoIn is not valid."
}
```

### recipeNotFound
Returned when recipe cannot be found.

Example:
```json
{
  "code": "recipeNotFound",
  "error": "Recipe not found"
}
```

### componentNotFound
Returned when component cannot be found.

Example:
```json
{
  "code": "componentNotFound",
  "error": "Component not found"
}
```
