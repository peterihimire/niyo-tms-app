import { IsString, IsOptional, IsEnum } from 'class-validator';
import { TaskCategory, TaskPriority, TaskStatus } from '@prisma/client'; // Adjust the import path as needed

export class EditTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  desc?: string;

  @IsOptional() // Use @IsOptional() to allow the field to be omitted
  @IsEnum(TaskStatus)
  status?: TaskStatus; // Make the field optional

  @IsOptional()
  @IsString()
  dueDate?: string;

  @IsOptional()
  @IsEnum(TaskCategory)
  category: TaskCategory;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority: TaskPriority;
}
