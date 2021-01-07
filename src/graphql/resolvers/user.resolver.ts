import { Resolver, Query, Ctx, Authorized } from 'type-graphql';
import { User } from '../../generated/type-graphql';

import { Context } from '../../interfaces/context';

@Resolver()
export class UserResolver {
  @Authorized()
  @Query(() => User)
  async me(@Ctx() { prisma, user: { id } }: Context): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    });

    if (!user) throw new Error('user not found');

    return user;
  }
}
