import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { TaskCategory, TaskPriority, TaskStatus } from '@prisma/client'; // Adjust the import path as needed

export class AddTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  desc: string;

  @IsEnum(TaskStatus)
  @IsOptional() // Use @IsOptional() to allow the field to be omitted
  status?: TaskStatus; // Make the field optional

  @IsString()
  @IsNotEmpty()
  dueDate: string;

  @IsEnum(TaskCategory)
  @IsNotEmpty()
  category: TaskCategory;

  @IsEnum(TaskPriority)
  @IsNotEmpty()
  priority: TaskPriority;
}
