import { type LoaderFunction, json } from "react-router-dom";
import { getRequestContext } from "../server/request-context";

export type LoaderData = {
  theme: string;
};

export const loader: LoaderFunction = () => {
  const ctx = getRequestContext();
  return json({ theme: ctx.session.theme } satisfies LoaderData);
};
