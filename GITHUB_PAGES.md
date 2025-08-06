# GitHub Pages Configuration

Ce projet est configuré pour être déployé automatiquement sur GitHub Pages.

## Configuration

### Workflow GitHub Actions
Le fichier `.github/workflows/deploy.yml` configure le déploiement automatique :
- Se déclenche à chaque push sur la branche `main`
- Build le projet avec Vite
- Déploie automatiquement sur GitHub Pages

### Configuration Vite
La configuration Vite (`vite.config.js`) inclut :
- Base URL configurée pour GitHub Pages : `/portefolio-ultra/`
- Build optimisé pour la production

## Déploiement

### Déploiement automatique
Le site se déploie automatiquement à chaque push sur la branche `main`.

### Déploiement manuel
Si vous voulez déployer manuellement :

```bash
npm install
npm run deploy
```

## URL du site
Une fois déployé, votre site sera accessible à :
`https://eulogep.github.io/portefolio-ultra/`

## Activation de GitHub Pages

1. Allez dans les paramètres de votre repository GitHub
2. Naviguez vers "Pages" dans le menu de gauche
3. Dans "Source", sélectionnez "GitHub Actions"
4. Le déploiement se fera automatiquement via le workflow

## Dépannage

Si le site ne se déploie pas :
1. Vérifiez que le workflow GitHub Actions s'est bien exécuté
2. Assurez-vous que les permissions GitHub Pages sont activées
3. Vérifiez les logs du workflow pour identifier les erreurs
