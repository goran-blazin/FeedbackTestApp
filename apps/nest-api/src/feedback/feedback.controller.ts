import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
// import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Controller('api/feedback')
@Controller('api/feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto);
  }

  @Get()
  findAll(
    @Query('filterByReporter') filterByReporter: string,
    @Query('sortByDate') sortByDate: 'ASC' | 'DESC',
    @Query('pageNumber') pageNumber: string,
    @Query('perPage') perPage: string,
  ) {
    return this.feedbackService.findAll({
      filterByReporter,
      sortByDate,
      pageNumber: +pageNumber,
      perPage: perPage ? +perPage : undefined,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackService.findOne(id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateFeedbackDto: UpdateFeedbackDto,
  // ) {
  //   return this.feedbackService.update(+id, updateFeedbackDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackService.remove(id);
  }
}
