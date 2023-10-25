import { TRPCError, inferAsyncReturnType, initTRPC } from "@trpc/server";
import prisma from "./db";
import { getServerAuthSession } from "./auth";

interface CreateContextOptions {
  headers: Headers;
}

export const createTRPCContext = async (opts: CreateContextOptions) => {
  const session = await getServerAuthSession();
  return {
    session,
    headers: opts.headers,
    prisma,
  };
};

const t = initTRPC
  .context<inferAsyncReturnType<typeof createTRPCContext>>()
  .create();

export const router = t.router;
export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
