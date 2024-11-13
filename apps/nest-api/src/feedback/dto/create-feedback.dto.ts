import { IsString, IsEmail, IsEnum, Length, IsNotEmpty } from 'class-validator';
import { FeedbackType } from '@prisma/client';

export class CreateFeedbackDto {
  @IsNotEmpty()
  @IsString()
  @Length(2)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(FeedbackType)
  feedbackType: FeedbackType;

  @IsNotEmpty()
  @IsString()
  @Length(10)
  message: string;
}
