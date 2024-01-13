# Instructions for initial setup!

If it's your first time cloning the project and you're trying to get started with development, then congratulations! There's a few steps that you need to follow to ensure that you won't run into any problems getting the project running:

1. Install nvm and npm
2. Navigate to the /frontend folder
3. Run `npm install` to install the project dependencies
4. Create a .env file in the /frontend folder
5. Within the .env file, add a line saying `DOCS_PATH=/AthenaDocs/`
6. To start the project, run `npm run dev`!

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
