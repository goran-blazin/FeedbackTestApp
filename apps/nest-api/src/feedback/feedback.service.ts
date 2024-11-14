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

  async findAll({
    filterByReporter,
    sortByDate,
    pageNumber,
    perPage = 5,
  }: {
    filterByReporter?: string;
    sortByDate?: 'ASC' | 'DESC';
    pageNumber?: number;
    perPage: number;
  }) {
    const [data, totalCount] = await Promise.all([
      this.prisma.feedback.findMany({
        where: {
          name: filterByReporter,
        },
        orderBy: {
          createdAt: sortByDate === 'DESC' ? 'desc' : 'asc',
        },
        take: pageNumber ? perPage : undefined,
        skip: pageNumber ? perPage * (pageNumber - 1) : undefined,
      }),
      this.prisma.feedback.count({
        where: {
          name: filterByReporter,
        },
      }),
    ]);

    return {
      data,
      totalCount,
    };
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
