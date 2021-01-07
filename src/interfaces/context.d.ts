import { PrismaClient } from '@prisma/client';
import { Response } from 'express';

interface Context {
  prisma: PrismaClient;
  res: Response;
  user: {
    id: string;
  };
}
