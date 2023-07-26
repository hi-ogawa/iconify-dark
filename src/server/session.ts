import type { RequestHandler } from "@hattip/compose";
import { wrapError } from "@hiogawa/utils";
import * as cookieLib from "cookie";
import { z } from "zod";

//
// toy cookie session
//

declare module "@hattip/compose" {
  interface RequestContextExtensions {
    session: SessionData;
    commitSession: () => void;
  }
}

export function sessionHandler(): RequestHandler {
  return async (ctx) => {
    ctx.session = readCookieSession(
      ctx.request.headers.get("cookie") ?? undefined,
    );

    let setCookie: string | undefined;
    ctx.commitSession = () => {
      setCookie = writeCookieSession(ctx.session);
    };

    // TODO: check status?
    const res = await ctx.next();
    if (setCookie) {
      res.headers.set("set-cookie", setCookie);
    }
    return res;
  };
}

const Z_SESSION_DATA = z.object({
  theme: z.string().default("system"),
});

const SESSION_DATA_DEFAULT = Z_SESSION_DATA.parse({});

type SessionData = z.infer<typeof Z_SESSION_DATA>;

const COOKIE_SESSION_KEY = "__session";

function readCookieSession(cookie?: string): SessionData {
  if (cookie) {
    const cookieRecord = cookieLib.parse(cookie);
    const value = cookieRecord[COOKIE_SESSION_KEY];
    if (value) {
      const parsed = wrapError(() => Z_SESSION_DATA.parse(JSON.parse(value)));
      if (parsed.ok) {
        return parsed.value;
      }
    }
  }
  return SESSION_DATA_DEFAULT;
}

function writeCookieSession(session: SessionData): string {
  return cookieLib.serialize(COOKIE_SESSION_KEY, JSON.stringify(session));
}
