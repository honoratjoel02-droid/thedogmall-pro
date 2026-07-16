# TheDogMall Pro - Database

## Vue d'ensemble

dogs
│
├── breedings
│ │
│ └── pregnancies
│ │
│ └── litters
│ │
│ └── puppies
│
├── vaccinations
├── treatments
├── health_records
├── documents
├── photos
├── expenses
│
clients
│
reservations
│
sales
│
tasks
│
notifications

# Dogs

Chaque chien possède :

- identité
- santé
- reproduction
- documents
- photos
- dépenses
- historique

---

# Breedings

Une saillie relie :

- une femelle
- un mâle

Une saillie peut produire :

- une gestation

---

# Pregnancies

Une gestation possède :

- date de début
- date prévue
- échographies
- radiographies
- statut

---

# Litters

Une portée possède :

- une mère
- un père
- plusieurs chiots

---

# Puppies

Chaque chiot possède :

- identité
- poids
- vaccins
- propriétaire
- statut

---

# Expenses

Une dépense peut être liée :

- à un chien
- à une portée
- à l'élevage

---

# Clients

Chaque client peut avoir :

- plusieurs réservations
- plusieurs achats

---

# Tasks

Les tâches permettent de suivre :

- soins
- rappels
- rendez-vous
- actions administratives

---

# Notifications

Les notifications sont générées automatiquement.

Exemples :

- vaccination
- vermifuge
- mise bas
- paiement
