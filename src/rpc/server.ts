import { type RequestHandler } from "@hattip/compose";
import { type TinyRpcRoutes, createTinyRpcHandler } from "@hiogawa/tiny-rpc";
import { zodFn } from "@hiogawa/tiny-rpc/dist/zod";
import { z } from "zod";
import { getRequestContext } from "../server/request-context";
import { RPC_ENDPOINT } from "./client";

export const rpcRoutes = {
  setTheme: zodFn(z.object({ theme: z.string() }))((input) => {
    const ctx = getRequestContext();
    ctx.session.theme = input.theme;
    ctx.commitSession();
  }),
} satisfies TinyRpcRoutes;

export function rpcHandler(): RequestHandler {
  return createTinyRpcHandler({
    endpoint: RPC_ENDPOINT,
    routes: rpcRoutes,
    onError(e) {
      console.error(e);
    },
  });
}
