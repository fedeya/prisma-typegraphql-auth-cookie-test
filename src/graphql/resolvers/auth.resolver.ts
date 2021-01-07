import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { UserCreateInput } from '../../generated/type-graphql';
import { Context } from '../../interfaces/context';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';

import { Token } from '../types/token.type';
import { AuthInput } from '../inputs/auth.input';

@Resolver()
export class AuthResolver {
  @Mutation(() => Token)
  async register(
    @Arg('data') data: UserCreateInput,
    @Ctx() { prisma, res }: Context
  ): Promise<Token> {
    const password = await argon2.hash(data.password);

    const user = await prisma.user.create({
      data: {
        ...data,
        password
      },
      select: {
        id: true
      }
    });

    const token = jwt.sign({ id: user.id }, 'secretword');
    res.cookie('token', token, { httpOnly: true });

    return {
      token
    };
  }

  @Mutation(() => Token)
  async login(
    @Arg('input') input: AuthInput,
    @Ctx() { prisma, res }: Context
  ): Promise<Token> {
    const user = await prisma.user.findUnique({
      where: {
        email: input.email
      },
      select: {
        password: true,
        id: true
      }
    });

    if (!user) throw new Error('user not found');

    const verified = await argon2.verify(user.password, input.password);

    if (!verified) throw new Error('password not match');

    const token = jwt.sign({ id: user.id }, 'secretword');
    res.cookie('token', token, { httpOnly: true });

    return {
      token
    };
  }
}
