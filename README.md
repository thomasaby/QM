# Quilt

A simple project management web app built with vanilla JavaScript, HTML, and CSS. Designed for easy deployment (e.g., GitHub Pages) and local use.
https://thomasaby.github.io/QM/

## Features
- Start a new project with name, description, start time, and end time
- Edit or delete existing projects
- All data is stored locally in the user's browser (localStorage)
- Clean, responsive UI

## Usage
1. Open `index.html` in your browser.
2. Click "Add New Project" to create a project.
3. Edit or delete projects as needed.

## Project Structure
- `index.html` — Main web app UI
- `style.css` — App styling
- `app.js` — App logic (project CRUD, localStorage)
- `log.txt` — Log of development steps

## Customization

## How to Convert This Web App to an iOS App

You can turn this web app into an iOS app using a hybrid framework like Cordova or Capacitor. This lets you wrap your HTML, CSS, and JavaScript code in a native iOS shell and publish it to the App Store.

### Steps (Cordova/Capacitor)
1. **Install Node.js and npm** (if not already installed).
2. **Install Cordova or Capacitor globally:**
	- Cordova: `npm install -g cordova`
	- Capacitor: `npm install --save @capacitor/core @capacitor/cli`
3. **Create a new Cordova/Capacitor project.**
4. **Copy your web files** (`index.html`, `style.css`, `app.js`, etc.) into the project’s `www` (Cordova) or `public` (Capacitor) folder.
5. **Add the iOS platform:**
	- Cordova: `cordova platform add ios`
	- Capacitor: `npx cap add ios`
6. **Build the project:**
	- Cordova: `cordova build ios`
	- Capacitor: `npx cap sync ios`
7. **Open the generated iOS project in Xcode:**
	- Cordova: Open the `.xcworkspace` file in the `platforms/ios` folder.
	- Capacitor: `npx cap open ios`
8. **Test and deploy** to a device or submit to the App Store.

For more details, see the [Cordova documentation](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/) or [Capacitor documentation](https://capacitorjs.com/docs/getting-started).


© 2026 QuiltMore Project