# Mistify Backend

[ @yanis26x ](https://github.com/yanis26x)
[ @el24s ](https://github.com/el24s)
[ @rym31 ](https://github.com/rym31)

Backend de l'application Mistify, une application React pour consulter et acheter des parfums.

Frontend : https://github.com/yanis26x/Mistify-frontend

## Installation

```bash
npm install
```
## Lancer le projet
```bash
npm run start:dev
```

## Stack ?
- NestJS
- TypeScript
- TypeORM
- SQLite
- class-validator
- cookie-session

## Base de données
Le projet utilise SQLite avec le fichier :
```txt
db.sqlite
```


Pour ouvrir la bd dans VS Code :


1. Faire `Shift + Cmd + P` sur macOS, ou `Ctrl + Shift + P` sur Windows.
2. Chercher `SQLite: Open Database`.
3. Sélectionner `db.sqlite`.

## Scripts utiles

```bash
npm run start:dev   # lance le serveur en mode watch
npm run build       # compile le projet
npm run test        # lance les tests unitaires
npm run test:e2e    # lance les tests end-to-end
npm run lint        # lance ESLint avec correction automatique
npm run format      # formate le code avec Prettier
```

## Modules principaux

- `auth` : inscription, connexion, session utilisateur et gestion des users.
- `parfums` : catalogue des parfums.
- `commentaires` : avis et notes sur les parfums.
- `annonces` : annonces de vente.
- `offres` : offres faites sur les annonces.
- `panier` : panier utilisateur, protégé par session.

## Routes principales

### Auth

```txt
GET    /auth
POST   /auth/signup
POST   /auth/signin
POST   /auth/signout
GET    /auth/whoami
GET    /auth/:id
PATCH  /auth/:id
DELETE /auth/:id
DELETE /auth
```

### Parfums

```txt
GET    /parfums
GET    /parfums/:id
POST   /parfums
PATCH  /parfums/:id
DELETE /parfums/:id
```

Exemple de création :

```json
{
  "name": "Sauvage",
  "brand": "Dior",
  "description": "Parfum frais et sauvage",
  "imageUrl": "https://images.unsplash.com/photo-1594035910387-fea47794261f",
  "price": 120,
  "country": "France",
  "gender": "Homme",
  "year": 2015,
  "topNotes": "Bergamote",
  "middleNotes": "Poivre",
  "baseNotes": "Ambroxan"
}
```

### Commentaires

```txt
POST   /parfums/:parfumId/commentaires
GET    /parfums/:parfumId/commentaires
PUT    /commentaires/:id
DELETE /commentaires/:id
```

### Annonces

```txt
GET    /annonces
POST   /annonces
DELETE /annonces/:id
```

### Offres

```txt
POST  /annonces/:annonceId/offres
GET   /annonces/:annonceId/offres
PATCH /offres/:id/accept
PATCH /offres/:id/refuser
```

### Panier

Ces routes demandent une session utilisateur connectée.

```txt
GET    /panier
POST   /panier
PATCH  /panier/:parfumId
DELETE /panier/:parfumId
DELETE /panier
```

Exemple pour ajouter un parfum au panier :

```json
{
  "parfumId": 1,
  "quantite": 2
}
```

## Requêtes HTTP de test

Des exemples de requêtes sont disponibles dans le dossier :

```txt
zREQUEST/
```

Tu peux les utiliser avec l'extension REST Client de VS Code.

## Seed des parfums

Le fichier `seedParfums.js` permet d'ajouter quelques parfums de test.

Lance d'abord le serveur :

```bash
npm run start:dev
```

Puis, dans un autre terminal :

```bash
node seedParfums.js
```

## Commandes NestJS utiles

Créer un module :

```bash
nest g module users
```

Créer un controller :

```bash
nest g controller users --no-spec
```

Créer un service :

```bash
nest g service users --no-spec
```
