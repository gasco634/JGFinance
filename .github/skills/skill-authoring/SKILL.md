---
name: skill-authoring
description: "Créer, revoir et améliorer un skill VS Code dans SKILL.md. À utiliser pour transformer un workflow répétable en compétence agent, choisir sa portée workspace ou personnelle, rédiger le frontmatter, clarifier les ambiguïtés et valider la découvrabilité et l'exécution du skill."
argument-hint: "Décrivez le workflow à transformer en skill"
user-invocable: true
disable-model-invocation: false
---

# Création de skills

## Résultat attendu

Produire un skill autonome, découvrable et testable qui guide un agent à travers un workflow répétable. Le fichier `SKILL.md` doit rester sous 500 lignes; les ressources complémentaires doivent être référencées avec des chemins relatifs `./`.

## Quand l'utiliser

- Transformer une méthode de travail récurrente en workflow agent.
- Créer ou mettre à jour un dossier `.github/skills/<nom>/`.
- Vérifier un frontmatter, une description de déclenchement ou une structure de skill.
- Rendre un skill plus précis après un premier essai.

## Procédure

1. Examiner la demande et l'historique disponible pour extraire les étapes, les décisions, les exceptions et les critères de réussite du workflow.
2. Si aucun workflow clair n'émerge, demander:
   - quel résultat concret le skill doit produire;
   - s'il est workspace-scoped ou personnel;
   - s'il doit être une checklist courte ou une procédure complète.
3. Choisir le nom en minuscules avec des chiffres ou des tirets uniquement. Le nom doit correspondre exactement au dossier.
4. Déterminer la portée:
   - workspace: `.github/skills/<nom>/SKILL.md`;
   - personnelle: `~/.copilot/skills/<nom>/SKILL.md`, `~/.agents/skills/<nom>/SKILL.md` ou `~/.claude/skills/<nom>/SKILL.md`, selon l'environnement utilisé.
5. Rédiger le frontmatter entre deux lignes `---`. Inclure `name` et une description de moins de 1024 caractères contenant les mots-clés, déclencheurs et cas d'usage réels.
6. Structurer le corps avec au minimum:
   - le résultat produit;
   - les situations d'utilisation;
   - une procédure numérotée;
   - les décisions conditionnelles et leurs critères;
   - les validations de fin.
7. Déporter les longs exemples, scripts et références dans `references/`, `scripts/` ou `assets/`. Depuis `SKILL.md`, ne référencer que des chemins relatifs et proches.
8. Enregistrer un premier brouillon, puis repérer la partie la plus ambiguë ou la moins vérifiable et poser une question ciblée avant la finalisation.
9. Après clarification, ajuster uniquement les étapes concernées et effectuer la validation finale.

## Décisions à prendre

| Question | Décision |
| --- | --- |
| Le workflow s'applique-t-il à la plupart des tâches du projet ? | Utiliser plutôt une instruction permanente. |
| Est-il ciblé, réutilisable et exécuté à la demande ? | Utiliser un skill. |
| Est-ce une seule action paramétrée sans procédure multi-étapes ? | Utiliser plutôt un prompt. |
| Faut-il imposer une action déterministe à un moment du cycle agent ? | Évaluer un hook. |
| Faut-il isoler le contexte ou limiter les outils par étape ? | Évaluer un agent personnalisé. |

## Validation finale

- Le dossier et la valeur `name` correspondent exactement.
- Le YAML est valide, sans tabulations, et se trouve entre deux délimiteurs `---`.
- La description explique clairement quand charger le skill et contient des termes recherchables.
- Les étapes sont ordonnées, actionnables et couvrent les branches importantes.
- Le résultat et les critères de réussite sont observables.
- Les chemins de ressources sont relatifs et les fichiers référencés existent.
- Le contenu reste autonome, ciblé et sous 500 lignes.
- Une première utilisation du skill permet d'identifier au plus une clarification nécessaire, plutôt que de laisser une ambiguïté silencieuse.