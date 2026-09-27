# JGFinance

JGFinance est une application web de gestion financière personnelle et professionnelle, conçue comme une Progressive Web App (PWA) pour fonctionner sur navigateur mobile ou desktop, avec sauvegarde cloud via Supabase.

## Fonctionnalités

- Suivi des revenus, dépenses et budgets
- Gestion des clients et des domaines
- État financier global et bilans
- Thème et personnalisation locale
- Synchronisation multi-appareils via Supabase
- Installation comme application sur mobile
- Fonctionnement hors ligne grâce au service worker

## Aperçu du projet

- [index.html](index.html) — page principale de l’application
- [Bilan Financier.html](Bilan%20Financier.html) — vue de bilan / gestion financière
- [jgfinance-cloud.js](jgfinance-cloud.js) — logique de sauvegarde et d’authentification Supabase
- [supabase-config.js](supabase-config.js) — configuration publique de Supabase
- [service-worker.js](service-worker.js) — cache offline et comportement PWA
- [manifest.webmanifest](manifest.webmanifest) — configuration de l’application installable
- [CONFIGURER-JGFINANCE.md](CONFIGURER-JGFINANCE.md) — guide complet de configuration et de publication

## Prérequis

- Un navigateur moderne
- Un hébergement web statique compatible HTTPS
- Un projet Supabase pour la synchronisation cloud

## Démarrage local

Depuis le dossier du projet, lancez un serveur local :

```bash
py -3 -m http.server 8000 --bind 127.0.0.1
```

Puis ouvrez dans le navigateur :

```text
http://127.0.0.1:8000/
```

## Configuration Supabase

1. Créer un projet Supabase
2. Exécuter le schéma SQL de [supabase-schema.sql](supabase-schema.sql)
3. Copier l’URL du projet ainsi que la clé publique `anon`
4. Remplir les valeurs dans [supabase-config.js](supabase-config.js)
5. Vérifier les redirections autorisées dans Supabase Auth

Pour plus de détails, consultez [CONFIGURER-JGFINANCE.md](CONFIGURER-JGFINANCE.md).

## Déploiement

Le projet est pensé pour être publié sur un hébergement statique HTTPS (GitHub Pages, Cloudflare Pages, Netlify, Vercel static hosting, etc.).

Les fichiers doivent être publiés à la racine du site avec leur arborescence complète.

## Licence

Ce projet est fourni tel quel pour usage personnel et éducatif.

## Auteur

JGFinance
