ORCHESTRE SYMPHONIE — SITE VITRINE
===================================

Structure:
- index.html                 Accueil
- pages/evenements.html      Liste des événements
- pages/evenement.html       Détail d'un événement (via ?id=...)
- pages/membres.html         Membres
- pages/contact.html         Contact + formulaire
- admin/index.html           Mini espace admin (démo localStorage)
- css/style.css              Design complet
- js/data.js                 Données initiales
- js/app.js                  Navigation + rendu
- js/admin.js                Ajout/suppression événements côté navigateur
- assets/images/             Toutes les images locales à remplacer

IMPORTANT ADMIN:
GitHub Pages est un hébergement statique. Le mini-admin inclus ici stocke les événements
avec localStorage: ils restent sur le navigateur utilisé pour l'administration et ne sont
pas synchronisés entre visiteurs. Pour un vrai admin public (tous les visiteurs voient les
nouveaux événements), il faudra connecter le site à un backend/database (ex. Supabase,
Firebase, Django ou Node.js).

Compte DEMO:
Identifiant: admin
Mot de passe: symphonie2026

IMAGES:
Les fichiers dans assets/images/ sont des placeholders SVG locaux. Remplace-les simplement
par tes propres images en gardant les mêmes noms/extensions, ou modifie les chemins dans
js/data.js.
