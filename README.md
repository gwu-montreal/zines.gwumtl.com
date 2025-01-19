# GWU Zine

The website for the Game Workers Unite Montréal zine.

[Access the admin panel](https://zines.gwumtl.com/admin) to start editing content!

## Contributing to the Code

First, ensure sure you've installed Node, ideally at least the version of that's listed in [the `.node-version` file](.node-version). You can also use [`fnm`](https://github.com/Schniz/fnm) and let it pick the correct Node version to use automatically.

With the right version of Node installed, ensure [corepack](https://nodejs.org/docs/latest/api/corepack.html) is enabled:

```sh
corepack enable
```

Next, install the project dependencies with [pnpm](https://pnpm.io/). (If you ran the Corepack command above, this should just work — no need to install pnpm.)

```sh
pnpm install
```

Finally, run

```sh
pnpm start
```

to launch the development server, which will allow you to make changes and preview them live.

To preview a production-ready static HTML export of the site, run `pnpm export`. The output in the `out/` directory corresponds to what you'd see in the live site. After doing this, you can preview it by running `pnpm preview`.

## Misc

You can use whatever you want, but one nice editor is [Visual Studio Code](https://code.visualstudio.com/).

You can run Prettier on the command line to format all your files at once:

```sh
pnpm prettier
```
