import { hashPassword } from "@/lib/utils";
import { publicProcedure, router } from "../trpc";

import { signinSchema, signupSchema } from "@/constants/schema";

export const userRouter = router({
  // getUserByEmail: publicProcedure
  //   .input(z.string().email())
  //   .query(async ({ input, ctx }) => {
  //     const user = await ctx.prisma.user.findUnique({
  //       where: { email: input },
  //     });
  //     return user;
  //   }),

  create: publicProcedure
    .input(signupSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      });
      if (user) return false;
      const otp = await ctx.prisma.otp.findUnique({
        where: {
          verified: false,
          code_email: {
            code: input.code,
            email: input.email,
          },
        },
      });
      if (!otp) return false;

      const hash = hashPassword(input.password);
      await ctx.prisma.user.create({
        data: {
          email: input.email,
          password: hash,
          userPreference: {
            create: {
              username: input.email,
            },
          },
        },
      });
      await ctx.prisma.otp.update({
        where: { id: otp.id },
        data: {
          verified: true,
        },
      });
      return true;
    }),
});
