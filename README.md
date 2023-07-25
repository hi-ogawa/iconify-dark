# iconify-dark

A little proxy with injecting `prefers-color-scheme` to [iconify](https://github.com/iconify)'s svg:

```html
<style>
  :root { color: black }
  @media (prefers-color-scheme: dark) {
    :root { color: white }
  }
</style>
```

This allows automatically changing browser tab icons based on system dark mode settings.

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
pnpm release
```

## references

- https://iconify.design/docs/api/
