import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ParfumsService } from './parfums.service';
import { CreateParfumDto } from '../dtos/create-parfum.dto';
import { UpdateParfumDto } from '../dtos/update-parfum.dto';

@Controller('parfums')
export class ParfumsController {
  constructor(private service: ParfumsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(parseInt(id));
  }

  @Post()
  create(@Body() body: CreateParfumDto) {
    return this.service.create(body);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: UpdateParfumDto) {
    return this.service.update(parseInt(id), body);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.service.remove(parseInt(id));
  }
}