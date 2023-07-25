# iconify-dark

A tiny proxy to inject `prefers-color-scheme` to [iconify](https://github.com/iconify)'s svg,
which makes icon color to adapt to system theme setting, for example, when it's used as a browser tab favicon.

## example

```sh
curl https://iconify-dark-hiro18181.vercel.app/icon/ri/code-s-slash-line
```

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <style>
    :root { color: black }
    @media (prefers-color-scheme: dark) {
      :root { color: white }
    }
  </style>
  <path fill="currentColor" d="m24 12l-5.657 5.657l-1.414-1.414L21.172 12l-4.243-4.243l1.414-1.414L24 12ZM2.828 12l4.243 4.243l-1.414 1.414L0 12l5.657-5.657L7.07 7.757L2.828 12Zm6.96 9H7.66l6.552-18h2.128L9.788 21Z"/>
</svg>
```

## development

```sh
# development
pnpm i
pnpm dev

# build for local preview
pnpm build-preview
pnpm preview

# build for vercel edge (see misc/vercel-edge/README.md)
pnpm build-vercel-edge
pnpm release-production
```
