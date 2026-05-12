import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ParfumsService } from './parfums.service';
import { CreateParfumDto } from '../dtos/create-parfum.dto';
import { UpdateParfumDto } from '../dtos/update-parfum.dto';
import { AdminGuard } from 'src/guards/admin.guards';
import { AuthGuard } from 'src/guards/auth.guards';

@Controller('parfums')
export class ParfumsController {
  constructor(private service: ParfumsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('/filter')
  filterCombined(
    @Query('gender') gender?: string,
    @Query('family') family?: string,
    @Query('prixMax') prixMax?: string,
  ) {
    return this.service.filterCombined(gender, family, prixMax ? parseFloat(prixMax) : undefined);
  }

  @Get('/filter/gender/:gender')
  filterByGender(@Param('gender') gender: string) {
    return this.service.filterByGender(gender);
  }

  @Get('/filter/year/:year')
  filterByYear(@Param('year') year: string) {
    return this.service.filterByYear(parseInt(year));
  }

  @Get('/filter/family/:family')
  filterByFamily(@Param('family') family: string) {
    return this.service.filterByFamily(family);
  }

  @Get('/filter/price/:price')
  filterByPrice(@Param('price') price: string) {
    return this.service.filterByPrice(parseFloat(price));
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(parseInt(id));
  }
  @UseGuards(AuthGuard)
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