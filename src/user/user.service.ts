import { Injectable, ForbiddenException, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // @route GET api/admin/get_user_by_acct_id
  // @desc To update user by account ID
  // @access Private
  async userInfo(user: any) {
    try {
      console.log('This is user payload', user);
      Logger.verbose('This is user payload', user);

      const acct = await this.prisma.user.findUnique({
        where: {
          email: user.data.email,
        },
        include: {
          // tasks: true,
          tasks: {
            select: {
              userId: false,
              id: false,
              title: true,
              desc: true,
              status: true,
              dueDate: true,
              category: true,
              priority: true,
              uuid: true,
            },
          },
        },
      });

      const userWithTasks = {
        ...acct,
      };

      console.log('These are his roles...', userWithTasks);

      if (!acct) throw new ForbiddenException('No user!');
      // const verifyPass = await argon.verify(user.password, password);
      // if (!verifyPass) throw new ForbiddenException('Credential incorrect!');

      delete userWithTasks.password;
      delete userWithTasks.id;
      delete userWithTasks.createdAt;
      delete userWithTasks.updatedAt;

      return {
        status: 'success',
        msg: 'User details',
        data: userWithTasks,
      };
    } catch (error) {
      throw error;
    } finally {
      await this.prisma.$disconnect(); // Disconnect the Prisma client
    }
  }
}
