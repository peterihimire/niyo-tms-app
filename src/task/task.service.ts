import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddTaskDto, EditTaskDto } from './dto';
import { TaskGateway } from './task.gateway';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private readonly taskGateway: TaskGateway,
  ) {}

  // @route GET api/admin/get_user_by_acct_id
  // @desc To update user by account ID
  // @access Private
  async addTask(dto: AddTaskDto, userInfo: any) {
    try {
      const foundTask = await this.prisma.task.findFirst({
        where: {
          title: dto.title,
          userId: userInfo.id,
        },
      });

      if (foundTask) {
        throw new ConflictException(
          `Task with title '${dto.title}' already exists for this user!`,
        );
      }

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
          userId: userInfo.id,
        },
      });

      this.taskGateway.emitTaskCreated({
        msg: 'Task was successfully created ',
        data: newTask,
      });

      const {
        title,
        desc,
        status,
        dueDate,
        category,
        createdAt,
        updatedAt,
        priority,
        uuid,
      } = newTask;

      return {
        status: 'success',
        msg: 'Task created',
        data: {
          title,
          desc,
          status,
          category,
          dueDate,
          priority,
          uuid,
          createdAt,
          updatedAt,
        },
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
  async getTasks(userInfo) {
    try {
      const all_tasks = await this.prisma.task.findMany({
        where: {
          userId: userInfo.id,
        },
      });
      if (!all_tasks) throw new NotFoundException('No task found!');

      const totalTask = all_tasks.map((task) => {
        return {
          title: task.title,
          desc: task.desc,
          status: task.status,
          dueDate: task.dueDate,
          category: task.category,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
          priority: task.priority,
          uuid: task.uuid,
        };
      });

      return {
        status: 'success',
        msg: 'All tasks',
        data: totalTask,
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
  async getTaskById(id: string, userInfo) {
    try {
      const task = await this.prisma.task.findUnique({
        where: {
          uuid: id,
          userId: userInfo.id,
        },
      });

      if (!task) throw new NotFoundException('Task does not exist!');

      const {
        title,
        desc,
        status,
        dueDate,
        category,
        createdAt,
        updatedAt,
        priority,
        uuid,
      } = task;

      return {
        status: 'success',
        msg: 'Task details',
        data: {
          title,
          desc,
          status,
          category,
          dueDate,
          priority,
          uuid,
          createdAt,
          updatedAt,
        },
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
  async editTask(id: string, dto: EditTaskDto, userInfo) {
    try {
      const task = await this.prisma.task.findUnique({
        where: {
          uuid: id,
          userId: userInfo.id,
        },
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
      this.taskGateway.emitTaskUpdated({
        msg: 'Task was successfully updated ',
        data: updatedtask,
      });
      const {
        title,
        desc,
        status,
        dueDate,
        category,
        createdAt,
        updatedAt,
        priority,
        uuid,
      } = updatedtask;
      return {
        status: 'success',
        msg: 'Task updated',
        data: {
          title,
          desc,
          status,
          category,
          dueDate,
          priority,
          uuid,
          createdAt,
          updatedAt,
        },
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
  async deleteTask(id: string, userInfo) {
    try {
      const task = await this.prisma.task.findUnique({
        where: {
          uuid: id,
          userId: userInfo.id,
        },
      });
      if (!task) throw new NotFoundException('Task does not exist!');

      await this.prisma.task.delete({
        where: { uuid: id },
      });

      this.taskGateway.emitTaskDeleted(
        `Task with id [ ${id} ] was successfully deleted!`,
      );

      return {
        status: 'success',
        msg: `Task with id [ ${id} ] was deleted.`,
      };
    } catch (error) {
      throw error;
    } finally {
      await this.prisma.$disconnect(); // Disconnect the Prisma client
    }
  }
}
