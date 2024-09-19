# Installation

Pour démarrer le projet il suffit de faire `npm i && npm start`

[Cette ligne](https://github.com/rlski/xplor-react-technical-test/blob/main/src/useFetch.ts#L6) ajoute la possibilité d'utiliser un access token Github pour éviter d`être bloqué par les quotas d'appels API publics.

Il faudra alors décommenter cette ligne et créer un `.env.local` qui référence la variable d'environnement `VITE_GITHUB_ACCESS_TOKEN`.

[Plus d'infos sur l'authentification à l'API Github ici](https://docs.github.com/en/rest/authentication/authenticating-to-the-rest-api?apiVersion=2022-11-28)

# Consignes

Vous allez devoir contribuer à un petite application Github. Celle-ci sert à visualiser la discussion autour d'une issue.

Essayez de réaliser un maximum de tâches **en un temps limité à 3 heures**. Il est inutile de chercher à réaliser l'ensemble, on sait qu'il faudrait plus de temps que celui imparti et ce n'est pas le but recherché.
Lorsqu'on vous aurez terminé, nous attendons recevoir votre code sous forme de lien vers un dépôt Github.

### 📝 1. Ajouter un champ éditable pour changer d’issue

Pour l'instant on visualise en dur l'issue `facebook/react/issues/7901`. Permettre à l'utilisateur de visualiser une autre issue. Vous êtes libre, on vous laisse choisir une solution qui vous semble pertinente et réalisable dans un temps court.

### 📝 2. Lister les utilisateurs participant à la conversation

Lister les utilisateurs sur la gauche de l'écran (dans la sidebar) et afficher le nombre de messages par utilisateur (à coté de leur nom ou pseudo).

### 📝 3. Filtrer les utilisateurs

S'appuyer sur liste d'utilisateurs dans la sidebar et ajouter la possibilité de filtrer les messages en masquant certains utilisateurs.

### 📝 4. Mettre en forme le contenu

Actuellement les messages sont affichés en texte brut. Ajouter la mise en forme originale : texte en gras, liens, extraits de code, etc.

### 📝 5. Ajouter les évènements de la timeline

Sur une issue il peut y avoir d'autres évènements que des messages : ajout d'un label, changement de statut (clôture de l'issue). Afficher ces évènements au milieu de la conversation, en respectant la date de publication.
