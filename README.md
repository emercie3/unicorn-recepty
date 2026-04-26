# unicorn-recepty
Backend pro správu receptů a souvisejících komponent.

## Struktura projektu
- `src/app.js` - hlavní server
- `src/routes/recipe.js` - receptové endpointy
- `src/routes/component.js` - komponentní endpointy
- `src/dao/` - logika úložiště
- `src/data/` - in-memory data stores
- `src/schemas/` - DTO validace
- `docs/api.md` - API dokumentace

## Spuštění
```bash
npm install
npm start
```

Server běží na `http://localhost:3000`

## Dokumentace
API najdeš v `docs/api.md`.

