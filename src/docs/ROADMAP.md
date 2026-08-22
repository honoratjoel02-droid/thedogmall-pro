# TheDogMall Pro - Roadmap

## Vision

TheDogMall Pro est un logiciel professionnel de gestion d'élevage multi-races.

L'objectif est d'accompagner les éleveurs dans la gestion quotidienne de leur activité, depuis la naissance des chiots jusqu'au suivi financier de l'élevage.

> Ce document reflète l'état réel du projet. Il est mis à jour au fil du développement plutôt que rédigé à l'avance : chaque case cochée correspond à une fonctionnalité déjà implémentée et testée.

---

## Fonctionnalités implémentées

### Chiens

- [x] Fiche chien complète (infos générales, statut, tags)
- [x] Cartes / grille des chiens, recherche globale, filtres
- [x] Modification, suppression
- [x] Suivi du poids (historique + graphique)
- [x] Suivi de l'alimentation (régime, quantité, historique)
- [x] Suivi santé (vaccins, vermifuges, traitements, consultations)
- [x] Tests génétiques par chien
- [x] Titres et récompenses (expositions, championnats)
- [x] Rappels de renouvellement (puce, assurance, LOF...)
- [x] Pedigree (arbre généalogique + certificat imprimable)

### Reproduction

- [x] Chaleurs (historique + prédiction de la prochaine)
- [x] Saillies (naturelle / insémination)
- [x] Calcul du coefficient de consanguinité (COI) entre reproducteurs
- [x] Vérification de compatibilité génétique entre reproducteurs
- [x] Gestations (échographie, radiographie, statut)
- [x] Checklist de mise bas (préparation avant la date prévue)

### Portées et chiots

- [x] Gestion des chiots par portée
- [x] Suivi du poids par chiot (courbe de croissance)
- [x] Calendrier de vaccination et de vermifuge (application groupée sur la portée)
- [x] Checklist de socialisation
- [x] Réservations et liste d'attente, conversion en réservation
- [x] Comparateur de portées
- [x] Photos de portée

### Clients

- [x] CRM (fiches clients, historique)
- [x] Historique d'interactions
- [x] Contrats de vente et modèles de contrats personnalisables
- [x] Paiements et suivi du solde dû
- [x] Historique d'achats par client

### Finances

- [x] Dépenses (ponctuelles et récurrentes)
- [x] Recettes (ventes, saillies, autres)
- [x] Rentabilité par portée
- [x] Statistiques (taux de réussite reproduction, prix moyen, top clients...)
- [x] Export CSV

### Calendrier et suivi

- [x] Alertes centralisées (santé, chaleurs, renouvellements, sauvegarde...)
- [x] Tâches
- [x] Journal d'élevage automatique
- [x] Notes récapitulatives de kennel
- [x] Objectifs d'élevage annuels

### Documents et administration

- [x] Photos et documents par chien
- [x] Sauvegarde et restauration complètes (export/import JSON)
- [x] Paramètres du kennel (identité, coordonnées)
- [x] Protection par mot de passe local

### Portées et chiots (suite)

- [x] Test d'évaluation comportementale des chiots (grille type Volhard, avant placement)

---

## Idées pour la suite

Fonctionnalités identifiées comme manquantes mais pas encore développées, par ordre d'utilité :

1. **Échéancier de paiement** — planifier acompte + solde à échéance, avec alerte de retard (aujourd'hui les paiements sont ponctuels)
2. **Comparateur de reproducteurs** — comparer plusieurs mâles candidats pour une femelle donnée (COI + compatibilité génétique + titres côte à côte)
3. **Saillies extérieures (stud service)** — actuellement toute saillie suppose que les deux chiens appartiennent au cheptel
4. **Co-propriété de chien** — pas de notion de copropriétaire sur une fiche chien
5. **Gestion de stock** — nourriture, produits vétérinaires, consommables
6. **Suivi post-vente** — retour client, satisfaction, mises à jour de santé après le départ du chiot

---

## Hors périmètre (choix assumés)

- Pas de backend / synchronisation multi-appareils : l'application fonctionne entièrement en local (localStorage), avec sauvegarde/restauration manuelle par fichier
- Pas de notifications push ou email (pas de serveur)
- Pas de multi-utilisateurs avec rôles/permissions
