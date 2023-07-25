import { type RequestContext } from "@hattip/compose";
import { splitFirst, tinyassert } from "@hiogawa/utils";
import { z } from "zod";

// TODO: caching

const Z_PARAMS = z.object({
  name: z.string(),
});

export async function get(ctx: RequestContext) {
  const params = Z_PARAMS.parse(
    Object.fromEntries(ctx.url.searchParams.entries()),
  );
  const data = await fetchIconData(params.name);
  const result = `\
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${data.meta.width} ${data.meta.height}">
  <style>
    :root { color: black }
    @media (prefers-color-scheme: dark) {
      :root { color: white }
    }
  </style>
  ${data.icon.body}
</svg>
`;
  return new Response(result, {
    headers: {
      "content-type": "image/svg+xml",
    },
  });
}

//
// iconify api https://iconify.design/docs/api/icon-data.html
//

const Z_ICONIFY_JSON = z
  .object({
    prefix: z.string(),
    icons: z.record(
      z
        .object({
          body: z.string(),
        })
        .passthrough(),
    ),
    width: z.number(),
    height: z.number(),
  })
  .passthrough();

async function fetchIconData(name: string) {
  const [collection, key] = splitFirst(name, "-");
  const res = await fetch(
    `https://api.iconify.design/${collection}.json?icons=${key}`,
  );
  tinyassert(res.ok);

  const data = Z_ICONIFY_JSON.parse(await res.json());
  const dataIcon = data.icons[key];
  tinyassert(dataIcon, `icon not found '${key}'`);

  return {
    meta: data,
    icon: dataIcon,
  };
}
