# PenX

> The best way to build web3 independent blog.


## Prepare

```bash
pnpm install
```

## Start blog

```bash
cd apps/penx-template
```

## Develop a theme

1. copy `themes/penx-theme-minimal`, eg: `themes/penx-theme-my-theme`

2. update `.env` in `penx-template`

```bash
NEXT_PUBLIC_THEME=penx-theme-my-theme
```

2. update `next.config.js` in `penx-template`

```bash
transpilePackages: ['penx-theme-my-theme'],
```

3. update `next.config.js` in `penx-template`

```bash
transpilePackages: ['penx-theme-my-theme'],
```

4. update `tailwind.config.js` in `penx-template`

```js
  content: [
    './node_modules/pliny/**/*.js',
    './node_modules/penx-theme-my-theme/src/**/*.{js,tsx,ts}',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
```



## theme examples

- https://github.com/trevortylerlee/astro-micro
- https://microblog-theta.vercel.app/
- https://sparkly-speculoos-0c9197.netlify.app/
- https://www.wujieli.com/
- https://enscribe.dev/
- https://dante-astro-theme.netlify.app/
- https://astro-milky-way.netlify.app/posts/
- https://astro-theme-vitesse.netlify.app/blog/
- https://astro-erudite.vercel.app/
- https://astroletter-preview.pages.dev/
- https://kai.bi/

## references

penx-template fork from:

- https://github.com/timlrx/tailwind-nextjs-starter-blog