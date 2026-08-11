# Galpotori — Android APK build

This repository packages the Galpotori React app as an Android APK using Vite + Capacitor + GitHub Actions.

## Phone-only build

1. Create a GitHub repository named `galpotori`.
2. Upload these files/folders to the repository, preserving paths:
   - `src/App.jsx`
   - `src/main.jsx`
   - `public/galpotori-logo.png`
   - `index.html`
   - `package.json`
   - `vite.config.js`
   - `capacitor.config.ts`
   - `.github/workflows/build-apk.yml`
3. Make sure the default branch is `main`.
4. Open **Actions** → **Build Galpotori APK** → **Run workflow**.
5. Wait for the workflow to finish successfully.
6. Open the completed workflow run and download the artifact **Galpotori-debug-apk**.
7. Extract the ZIP and install `app-debug.apk` on the Android phone.

The app is packaged locally by Capacitor; the app's data storage remains local to the device. Internet is only needed while GitHub builds the APK.
