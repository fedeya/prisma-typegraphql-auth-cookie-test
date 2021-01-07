import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchemaSync } from 'type-graphql';
import {
  FindManyPostResolver,
  FindUniquePostResolver,
  CreatePostResolver,
  PostRelationsResolver,
  UserRelationsResolver
} from './generated/type-graphql';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import jwt from 'express-jwt';
import cookieParser from 'cookie-parser';

import { AuthResolver } from './graphql/resolvers/auth.resolver';
import { UserResolver } from './graphql/resolvers/user.resolver';

import { Context } from './interfaces/context';
import { authChecker } from './lib/authChecker';

const app = express();

app.use(cors());
app.use(cookieParser());

const prisma = new PrismaClient();

const server = new ApolloServer({
  schema: buildSchemaSync({
    resolvers: [
      FindManyPostResolver,
      FindUniquePostResolver,
      CreatePostResolver,
      PostRelationsResolver,
      AuthResolver,
      UserResolver,
      UserRelationsResolver
    ],
    authChecker
  }),
  context: ({ req, res }): Context => ({ prisma, res, user: (req as any).user })
});

app.use(
  jwt({
    secret: 'secretword',
    algorithms: ['HS256'],
    credentialsRequired: false,
    getToken(req) {
      if (req.cookies.token) return req.cookies.token;

      return req.headers.authorization?.split(' ')[1];
    }
  })
);

server.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, () => {
  console.log('Server on port', 3000);
});
