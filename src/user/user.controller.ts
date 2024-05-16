import { Controller, Get, UseGuards, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import {
  // RoleExceptionFilter,
  HttpExceptionFilter,
} from 'src/exception';
// import { AuthDto } from './dto';
import {
  JwtGuard,
  // AuthenticatedGuard
} from 'src/auth/guard';

// @UseGuards(JwtGuard) //parent route
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // @Roles('admin', 'moderator')
  @UseFilters(HttpExceptionFilter)
  @UseGuards(JwtGuard) //individual route
  @Get('user_info')
  userInfo(@GetUser() user: User) {
    console.log('User object from user controller...', user);
    return this.userService.userInfo(user);
    // return user;
  }
}
