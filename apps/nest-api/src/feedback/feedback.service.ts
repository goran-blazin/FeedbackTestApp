import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { PrismaService } from '../prisma/prisma.service';
// import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(private readonly prisma: PrismaService) {}

  create(createFeedbackDto: CreateFeedbackDto) {
    return this.prisma.feedback.create({
      data: createFeedbackDto,
    });
  }

  findAll() {
    return this.prisma.feedback.findMany();
  }

  findOne(id: string) {
    return this.prisma.feedback.findUnique({
      where: {
        id,
      },
    });
  }

  // update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
  //   return `This action updates a #${id} feedback`;
  // }

  remove(id: string) {
    return this.prisma.feedback.delete({
      where: {
        id,
      },
    });
  }
}
