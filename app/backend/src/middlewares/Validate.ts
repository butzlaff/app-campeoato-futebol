import { NextFunction, Request, Response } from 'express';
import JWT, { TokenJWT } from '../utils/JWT';

function extractToken(bearerToken: string) {
  const token = bearerToken.split(' ')[0];
  if (token !== 'Bearer') {
    return bearerToken;
  }
  return bearerToken.split(' ')[1];
}

class Validations {
  static validarEmail(email: string): boolean {
    const regex = /^(?![a-z0-9]+\.)+[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return regex.test(email);
  }

  static validateUser(req: Request, res: Response, next: NextFunction): Response | void {
    const user = req.body;
    const requiredKeys = ['email', 'password'];
    const notFoundKey = requiredKeys.find((key) => !(key in user));
    const validEmail = Validations.validarEmail(user.email);
    if (notFoundKey || user.email.length < 1 || user.password.length < 1) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!validEmail) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const extractedToken = extractToken(token);
    const validToken = JWT.verify(extractedToken);
    const result: TokenJWT = JWT.decode(extractedToken);
    if (validToken === 'Token must be a valid Token' || !result) {
      return res.status(401).json({ message: validToken });
    }

    req.body.email = result.email;

    next();
  }
}

export default Validations;
