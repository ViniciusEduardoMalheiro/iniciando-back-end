import { id } from 'date-fns/locale';
import {Request, Response, NextFunction} from 'express';
import { decode, verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}


export default function ensureAuthenticated (
  request: Request,
  response: Response,
  next: NextFunction
  ) :void {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new Error('JWT token is missing');

    }

    const [, token] = authHeader.split(' ')

    try {
      const decoded = verify(token, authConfig.jwt.secret);

      const { sub } = decoded as TokenPayLoad;

      request.user = {
        id: sub,
      }

      console.log(decoded);

      return next();
    } catch {
      throw new Error('Invalid JWT token')
    }
  }
