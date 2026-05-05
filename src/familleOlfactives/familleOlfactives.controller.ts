import { Controller,Post,Get,Delete,Body,Param } from '@nestjs/common';
import { FamilleOlfactivesService } from './familleOlfactives.service';
import { CreateFamilleOlfactiveDto } from 'src/dtos/create-familleOlfactive.dto';

@Controller('familleOlfactives')
export class FamilleOlfactivesController {

    constructor(private service: FamilleOlfactivesService) {}

        @Post()
        create(@Body() body: CreateFamilleOlfactiveDto) {
            return this.service.create(body);
        }

        @Get('/:id')
        findOne(@Param('id') id: string) {
            return this.service.findOne(parseInt(id));
        }

    }


