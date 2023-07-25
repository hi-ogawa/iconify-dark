import type { RequestHandler } from "@hattip/compose";
import { tinyassert } from "@hiogawa/utils";
import { z } from "zod";

const Z_PARAMS = z.object({
  prefix: z.string(),
  icon: z.string(),
});

export const get: RequestHandler = async (ctx) => {
  const params = Z_PARAMS.parse(ctx.params);
  const data = await fetchIconData(params);
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
      // always revalidate
      "cache-control": "public, s-max-age=0, stale-while-revalidate=31536000",
    },
  });
};

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

async function fetchIconData({ prefix, icon }: z.infer<typeof Z_PARAMS>) {
  const res = await fetch(
    `https://api.iconify.design/${prefix}.json?icons=${icon}`,
  );
  tinyassert(res.ok);

  const data = Z_ICONIFY_JSON.parse(await res.json());
  const dataIcon = data.icons[icon];
  tinyassert(dataIcon, `icon not found '${icon}'`);

  return {
    meta: data,
    icon: dataIcon,
  };
}
