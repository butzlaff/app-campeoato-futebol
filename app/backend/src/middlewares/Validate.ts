import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWT';

class Validations {
  // static validateBook(req: Request, res: Response, next: NextFunction): Response | void {
  //   const book = req.body;
  //   const requiredKeys = ['title', 'price', 'author', 'isbn'];
  //   const notFoundKey = requiredKeys.find((key) => !(key in book));
  //   if (notFoundKey) {
  //     return res.status(400).json({ message: `${notFoundKey} is required` });
  //   }

  //   next();
  // }

  static validarEmail(email: string): boolean {
    const regexPart1 = /^(?!.*\.{2,})(?!.*@.*@)[a-zA-Z0-9._%+-]+@/;
    const regexPart2 = /(?!.*\.{2,})[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // const regex = /^(?!.*\.{2,})(?!.*@.*@)[a-zA-Z0-9._%+-]+@(?![^.]*\.{2,})[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regexPart1.test(email) && regexPart2.test(email);
  }

  static validateUser(req: Request, res: Response, next: NextFunction): Response | void {
    const user = req.body;
    const requiredKeys = ['email', 'password'];
    const notFoundKey = requiredKeys.find((key) => !(key in user));
    const validEmail = Validations.validarEmail(user.email);
    if (notFoundKey) {
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
    const validToken = JWT.verify(token);
    if (validToken === 'Token must be a valid Token') {
      return res.status(401).json({ message: validToken });
    }
    next();
  }
}

export default Validations;
