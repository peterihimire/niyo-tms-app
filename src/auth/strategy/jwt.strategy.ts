import { Injectable, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PrismaService } from 'src/prisma/prisma.service';
// import { AuthDto } from './dto';
// import * as argon from 'argon2';
// import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    console.log('Payload from JWT strategy', payload);

    const user = await this.prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!user) throw new ForbiddenException('No user!');
    delete user.password;
    // delete user.id;
    delete user.createdAt;
    delete user.updatedAt;

    return {
      status: 'success',
      msg: 'User info details',
      data: {
        ...user,
      },
    };
    // return payload
  }
}
