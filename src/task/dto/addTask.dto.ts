import {
  IsNotEmpty,
  IsNumber,
  IsString,
  // IsDate,
  // IsEnum,
} from 'class-validator';
// import { TaskPriority } from './TaskPriority'; // Assuming TaskPriority is your enum file

export class AddTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  desc: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  dueDate: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  priority: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
