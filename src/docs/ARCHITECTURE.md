# Architecture

## Frontend

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- shadcn/ui

## Architecture

Présentation

↓

Services

↓

Base de données

Les composants React ne doivent jamais accéder directement aux données.

Toutes les opérations passent par un service.

Exemple :

DogProfile

↓

dogsService

↓

Base de données
