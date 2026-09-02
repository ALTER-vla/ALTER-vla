# Paper Results Website

A dependency-free GitHub Pages site for supplementary result videos.

## Add videos

1. Copy browser-compatible `MP4` videos into `videos/`.
2. Replace the six entries in `assets/js/videos.js`, one entry for each video tile. Each entry supports `title`, `src`, and optional `poster`.
3. Open `index.html` locally to preview. The page displays six videos in a fixed two-column, three-row layout on desktop.

Keep individual files reasonably small for a responsive reviewer experience. GitHub blocks normal Git pushes for files over 100 MB; compress videos or use Git LFS / an external video host for larger assets.

## Publish on GitHub Pages

1. Create a new GitHub repository, for example `ALTER`.
2. From this directory, run:

   ```bash
   git init
   git add .
   git commit -m "Create supplementary video website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/ALTER.git
   git push -u origin main
   ```

3. On GitHub, open **Settings > Pages**, select **Deploy from a branch**, then choose branch **main** and folder **/(root)**.
4. The public address will be `https://YOUR-USERNAME.github.io/ALTER/`.

For a personal home page at `https://YOUR-USERNAME.github.io/`, name the repository exactly `YOUR-USERNAME.github.io`.
