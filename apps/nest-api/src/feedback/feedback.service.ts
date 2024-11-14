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

  findAll({
    filterByReporter,
    sortByDate,
  }: {
    filterByReporter?: string;
    sortByDate?: 'ASC' | 'DESC';
  }) {
    console.log(filterByReporter, sortByDate);
    return this.prisma.feedback.findMany({
      where: {
        name: filterByReporter,
      },
      orderBy: {
        createdAt: sortByDate === 'DESC' ? 'desc' : 'asc',
      },
    });
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
