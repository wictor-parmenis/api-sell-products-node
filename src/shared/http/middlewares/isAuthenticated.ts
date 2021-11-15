import authConfig from '@config/authConfig';
import { AppError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { request } from 'http';
import { verify } from 'jsonwebtoken';

export interface ITokenPayload {
  sub: string;
  iat: number;
  exp: number;
}

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token is missing.', 401);
  }
  if (authHeader) {
    const [bearer, token] = authHeader.split(' ');
    if (!bearer || !token) {
      throw new AppError('Invalid token.', 401);
    }

    try {
      const decodedToken = verify(token, `${authConfig.jwt.secret}`);
      const { sub } = decodedToken as ITokenPayload;

      req.user = {
        id: sub,
      };

      return next();
    } catch (error) {
      throw new AppError('Invalid token.', 401);
    }
  }
}
