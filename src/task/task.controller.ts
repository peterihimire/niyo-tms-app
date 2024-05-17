import {
  Controller,
  Get,
  UseGuards,
  UseFilters,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import {
  // AuthenticatedGuard,
  JwtGuard,
} from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { AddTaskDto, EditTaskDto } from './dto';
// import {
//   User,
//   Cart
// } from '@prisma/client';
import {
  HttpExceptionFilter,
  // RoleExceptionFilter,
  // ForbiddenException,
} from 'src/exception';

// @UseGuards(JwtGuard) //parent route
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post('add_task')
  @UseFilters(HttpExceptionFilter)
  @UseGuards(JwtGuard) //individual route
  addtask(@Body() dto: AddTaskDto, @GetUser() user) {
    console.log('Here is my dto object...', dto, user);
    console.log('Baba user object...', user);
    const userInfo = user.data;
    return this.taskService.addTask(dto, userInfo);
  }

  @Get('get_tasks')
  @UseFilters(HttpExceptionFilter)
  @UseGuards(JwtGuard)
  gettasks(@GetUser() user) {
    const userInfo = user.data;
    return this.taskService.getTasks(userInfo);
  }

  // @UseFilters(RoleExceptionFilter)
  @Get('get_task/:id')
  @UseFilters(HttpExceptionFilter)
  @UseGuards(JwtGuard)
  gettask(@Param('id') id: string, @GetUser() user) {
    console.log('This is user object...', user);
    const userInfo = user.data;
    return this.taskService.getTaskById(id, userInfo);
  }

  @Patch('update_task/:id')
  @UseFilters(HttpExceptionFilter)
  @UseGuards(JwtGuard)
  updatetask(
    @Param('id') id: string,
    @Body() dto: EditTaskDto,
    @GetUser() user,
  ) {
    const userInfo = user.data;
    return this.taskService.editTask(id, dto, userInfo);
  }

  @Delete('delete_task/:id')
  @UseFilters(HttpExceptionFilter)
  @UseGuards(JwtGuard)
  deletetask(@Param('id') id: string, @GetUser() user) {
    const userInfo = user.data;
    return this.taskService.deleteTask(id, userInfo);
  }
}
