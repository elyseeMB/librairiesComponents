Voici un exemple de `README.md` adapté à ton projet **Vite + Storybook** avec déploiement sur **GitHub Pages** :

---

````markdown
# 🧱 UI Components Library

Une bibliothèque de composants UI construite avec **Vite** et **Storybook**, conçue pour être facilement intégrée dans vos projets web.

---

## 📦 Technologies

- [Vite](https://vitejs.dev/) – pour un bundling ultra-rapide
- [Storybook](https://storybook.js.org/) – pour documenter et visualiser les composants UI
- [Yarn](https://yarnpkg.com/) – comme gestionnaire de paquets
- [GitHub Pages](https://pages.github.com/) – pour héberger la démo et la documentation

---

## 🚀 Développement local

1. **Cloner le dépôt**

   ```bash
   git clone https://github.com/<ton-utilisateur>/<ton-repo>.git
   cd <ton-repo>
   ```
````

2. **Installer les dépendances**

   ```bash
   yarn
   ```

3. **Démarrer le projet**

   ```bash
   yarn dev
   ```

4. **Lancer Storybook**

   ```bash
   yarn storybook
   ```

---

## 🛠️ Scripts utiles

| Script                 | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| `yarn dev`             | Lance l'application avec Vite                        |
| `yarn storybook`       | Lance Storybook en mode développement                |
| `yarn build`           | Génère le build Vite                                 |
| `yarn build-storybook` | Génère le build de Storybook dans `storybook-static` |
| `yarn preview`         | Prévisualise le build Vite                           |

---

## 🌐 Déploiement

Le projet est déployé automatiquement sur GitHub Pages grâce à une GitHub Action.

- 📄 Page principale : [`/`](https://<ton-utilisateur>.github.io/<ton-repo>/)
- 📘 Documentation Storybook : [`/storybook-static/`](https://<ton-utilisateur>.github.io/<ton-repo>/storybook-static/)

> Assure-toi que les fichiers générés (`dist/` et `storybook-static/`) soient bien inclus dans l'action de déploiement.

---

## 📁 Structure du projet

```
.
├── .github/workflows/      # Actions GitHub pour le déploiement
├── public/                 # Fichiers publics
├── src/                    # Code source
│   ├── css/                # Css UI
│   ├── stories/            # stories UI
│   ├── index.css/          # Main css UI
│   ├── Presentation/       # Presentation UI
│   └── main.tsx            # Entrée de l'application
├── storybook/              # Config Storybook (si séparée)
├── storybook-static/       # Généré par `yarn build-storybook`
├── vite.config.ts          # Configuration Vite
└── README.md
```

---

## 📝 Licence

Ce projet est sous licence [MIT](./LICENSE).

```

```
