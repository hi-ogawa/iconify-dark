import { createTinyRpcClientProxy } from "@hiogawa/tiny-rpc";
import { rpcRoutes } from "./server";

export const RPC_ENDPOINT = "/trpc";

export const rpcClient = createTinyRpcClientProxy<typeof rpcRoutes>({
  endpoint: RPC_ENDPOINT,
});
