# Installer et activer JGFinance

JGFinance est préparée comme une application web installable (PWA). Les opérations restent disponibles dans le navigateur et, une fois Supabase configuré, se sauvegardent dans le compte en ligne puis se partagent entre les appareils connectés à ce même compte.

## Activer la sauvegarde Supabase

1. Créer un projet Supabase et ouvrir son **SQL Editor**.
2. Copier tout le contenu de `supabase-schema.sql` dans l’éditeur et l’exécuter. La table `jgfinance_backups` utilise les politiques RLS pour que chaque compte ne puisse lire et modifier que sa propre sauvegarde.
3. Dans les paramètres API du projet, copier l’URL du projet et sa clé **publishable** (ou sa clé `anon` publique).
4. Ouvrir `supabase-config.js` et renseigner ces deux valeurs :

   ```js
   window.JGFINANCE_SUPABASE_CONFIG = {
     url: 'https://VOTRE-PROJET.supabase.co',
     publishableKey: 'VOTRE-CLE-PUBLIQUE'
   };
   ```

   La clé publique est prévue pour le navigateur et reste protégée par les politiques RLS de la base. Ne jamais y mettre une clé `service_role` ou une clé secrète.

5. Dans Supabase Auth, choisir le mode de confirmation d’adresse e-mail et ajouter l’adresse HTTPS du site dans les URL de redirection autorisées. Si la confirmation est activée, la personne doit cliquer le lien reçu par courriel avant sa première connexion.

## Publier et installer sur le téléphone

Publier **tous les fichiers et dossiers de ce projet** sur un hébergement web statique avec HTTPS, à la racine du site et en gardant leur arborescence. L’adresse du site ouvre JGFinance; l’application se lance depuis `Bilan Financier.html` et ses icônes PWA se trouvent dans `icons/`.

- **iPhone :** ouvrir l’adresse HTTPS dans Safari, toucher **Partager**, puis **Sur l’écran d’accueil**.
- **Android :** ouvrir l’adresse HTTPS dans Chrome, puis choisir **Installer l’application** ou **Ajouter à l’écran d’accueil**.

Sur le même iPhone ou appareil Android, l’app garde son cache et accepte les modifications hors ligne. La synchronisation reprend quand Internet et le projet Supabase sont accessibles. Sur un nouvel appareil, se connecter au même compte Supabase pour récupérer les données.

## Données synchronisées

Les revenus, dépenses, budgets, clients, domaines, devise, préférences régionales et thème sont enregistrés dans un instantané par compte. Les changements sont envoyés après une courte pause de saisie et diffusés aux autres appareils connectés. La photo de profil reste sur l’appareil.

Si deux appareils modifient le même compte pendant qu’ils sont hors ligne, JGFinance conserve l’instantané envoyé en dernier; elle ne fusionne pas automatiquement deux modifications simultanées et ne garde pas d’historique de versions. Garder une exportation CSV pour les archives importantes.

## Première connexion depuis un ancien compte local

Si un ancien compte local existe sur cet appareil et utilise la même adresse e-mail que le compte Supabase, JGFinance peut transférer ses opérations lors de la première connexion. Pour protéger les comptes, une connexion avec une autre adresse efface le cache financier local de l’ancien compte sur cet appareil; sa sauvegarde Supabase reste rattachée à son propre compte.
