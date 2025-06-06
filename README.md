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

1.  **Cloner le dépôt**

```bash

git clone https://github.com/elyseeMB/librairiesComponents.git

cd librairiesComponents





2.  **Installer les dépendances**



yarn

```

3.  **Démarrer le projet**

```bash

yarn dev

```

4.  **Lancer Storybook**

```bash

yarn storybook

```

---

## 🛠️ Scripts utiles

| Script | Description |

| ---------------------- | ---------------------------------------------------- |

| `yarn dev` | Lance l'application avec Vite |

| `yarn storybook` | Lance Storybook en mode développement |

| `yarn build` | Génère le build Vite |

| `yarn build-storybook` | Génère le build de Storybook dans `storybook-static` |

| `yarn preview` | Prévisualise le build Vite |

---

## 🌐 Déploiement

Le projet est déployé automatiquement sur GitHub Pages grâce à une GitHub Action.

- 📄 Page principale : [https://elyseemb.github.io/librairiesComponents/](https://elyseemb.github.io/librairiesComponents/)

- 📘 Documentation Storybook : [https://elyseemb.github.io/librairiesComponents/storybook-static/](https://elyseemb.github.io/librairiesComponents/storybook-static/)

> Assure-toi que les fichiers générés (`dist/` et `storybook-static/`) soient bien inclus dans l’action de déploiement.

---

## 📁 Structure du projet

```
├── .github/workflows/  # Actions GitHub pour le déploiement

├── public/  # Fichiers publics

├── src/  # Code source

│ ├──  css/  # CSS UI

│ ├──  stories/  # Stories UI

│ ├──  index.css  # CSS principal

│ ├──  Presentation/  # Composants de présentation

│ └──  main.tsx  # Entrée de l'application

├── storybook/  # Config Storybook (si séparée)

├── storybook-static/  # Généré par `yarn build-storybook`

├── vite.config.ts  # Configuration Vite

└── README.md
```
