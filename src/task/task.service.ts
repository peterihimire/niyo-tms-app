import {
  Injectable,
  ConflictException,
  NotFoundException,
  // ForbiddenException, Logger
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AddTaskDto, EditTaskDto } from './dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  // @route GET api/admin/get_user_by_acct_id
  // @desc To update user by account ID
  // @access Private
  async addTask(dto: AddTaskDto) {
    try {
      console.log('This is add-task dto  payload', dto);
      // Logger.verbose('This is user payload', user);

      const date = new Date(dto?.dueDate);
      const newTask = await this.prisma.task.create({
        data: {
          title: dto.title,
          desc: dto.desc,
          status: dto.status,
          dueDate: date,
          category: dto.category,
          priority: dto.priority,
          userId: dto.userId,
        },
      });

      return {
        status: 'success',
        msg: 'Task created',
        data: newTask,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `Task title '${dto.title}' already exist!`,
          );
        }
      }
      throw error;
    } finally {
      await this.prisma.$disconnect(); // Disconnect the Prisma client
    }
  }

  // @route GET api/admin/get_user_by_acct_id
  // @desc To update user by account ID
  // @access Private
  async getTasks() {
    try {
      const all_tasks = await this.prisma.task.findMany();
      if (!all_tasks) throw new NotFoundException('No task found!');

      return {
        status: 'success',
        msg: 'All tasks',
        data: all_tasks,
      };
    } catch (error) {
      throw error;
    } finally {
      await this.prisma.$disconnect(); // Disconnect the Prisma client
    }
  }

  // @route GET api/admin/get_user_by_acct_id
  // @desc To update user by account ID
  // @access Private
  async getTaskById(id: string) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { uuid: id },
      });

      if (!task) throw new NotFoundException('Task does not exist!');

      return {
        status: 'success',
        msg: 'Task details',
        data: task,
      };
    } catch (error) {
      throw error;
    } finally {
      await this.prisma.$disconnect(); // Disconnect the Prisma client
    }
  }

  // @route GET api/admin/get_user_by_acct_id
  // @desc To update user by account ID
  // @access Private
  async editTask(id: string, dto: EditTaskDto) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { uuid: id },
      });
      if (!task) throw new NotFoundException('Task does not exist!');

      const updatedtask = await this.prisma.task.update({
        where: { uuid: id },
        data: {
          title: dto.title,
          desc: dto.desc,
          status: dto.status,
          dueDate: dto.dueDate,
          category: dto.category,
          priority: dto.priority,
        },
      });

      return {
        status: 'success',
        msg: 'Task updated',
        data: updatedtask,
      };
    } catch (error) {
      throw error;
    } finally {
      await this.prisma.$disconnect(); // Disconnect the Prisma client
    }
  }

  // @route GET api/admin/get_user_by_acct_id
  // @desc To update user by account ID
  // @access Private
  async deleteTask(id: string) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { uuid: id },
      });
      if (!task) throw new NotFoundException('Task does not exist!');

      await this.prisma.task.delete({
        where: { uuid: id },
      });

      return {
        status: 'success',
        msg: 'Task deleted',
      };
    } catch (error) {
      throw error;
    } finally {
      await this.prisma.$disconnect(); // Disconnect the Prisma client
    }
  }
}
