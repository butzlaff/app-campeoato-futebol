import { JwtPayload, Secret, SignOptions, verify, sign, decode } from 'jsonwebtoken';

export type TokenJWT = {
  email: string;
  iat: number;
  exp: number;
};
export default class JWT {
  private static secret: Secret = process.env.JWT_SECRET || 'jwt_secret';

  private static jwtConfig: SignOptions = {
    algorithm: 'HS256', expiresIn: '1d',
  };

  static sign(payload: JwtPayload): string {
    return sign(payload, JWT.secret, JWT.jwtConfig);
  }

  static verify(token: string):JwtPayload | string {
    try {
      return verify(token, JWT.secret) as JwtPayload;
    } catch (e) {
      return 'Token must be a valid Token';
    }
  }

  static decode(token: string): TokenJWT {
    const decoded = decode(token);
    return decoded as TokenJWT;
  }
}
