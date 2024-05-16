import {
  IsNotEmpty,
  IsString,
  IsDate,
  // IsEnum,
} from 'class-validator';
// import { TaskPriority } from './TaskPriority'; // Assuming TaskPriority is your enum file

export class EditTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  desc: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsDate()
  @IsNotEmpty()
  dueDate: Date;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  priority: string;
}

// import { IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';

// export class EditProductDto {
//   @IsString()
//   @IsNotEmpty()
//   title: string;

//   @IsString()
//   @IsNotEmpty()
//   slug: string;

//   @IsArray()
//   image: string[];

//   @IsArray()
//   @IsNotEmpty()
//   color: string[];

//   @IsArray()
//   @IsNotEmpty()
//   category: string[];

//   @IsNumber()
//   @IsNotEmpty()
//   price: number;

//   @IsString()
//   @IsNotEmpty()
//   brand: string;

//   @IsNumber()
//   countInStock: number;

//   @IsNumber()
//   rating: number;

//   @IsString()
//   @IsNotEmpty()
//   desc: string;

//   @IsArray()
//   @IsNotEmpty()
//   size: string[];

//   @IsString()
//   numReviews: string;

//   // @IsNumber()
//   // @IsNotEmpty()
//   // adminId: number;

//   // @IsNumber()
//   // @IsNotEmpty()
//   // prodId: string;
// }
