import {
  IsString,
  IsOptional,
  // IsEnum,
} from 'class-validator';
// import { TaskPriority } from './TaskPriority'; // Assuming TaskPriority is your enum file

export class EditTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  desc?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  dueDate?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  priority?: string;
}
