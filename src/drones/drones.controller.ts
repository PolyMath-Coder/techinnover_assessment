import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DronesService } from './drones.service';
import { CreateDroneDto } from './dto/create-drone.dto';
import { UpdateDroneDto } from './dto/update-drone.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('drone')
export class DronesController {
  constructor(private readonly dronesService: DronesService) {}

  @Post('register')
  registerDrone(@Body() createDroneDto: CreateDroneDto) {
    return this.dronesService.registerDrone(createDroneDto);
  }

  @Get()
  findAll() {
    return this.dronesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dronesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDroneDto: UpdateDroneDto) {
    return this.dronesService.update(+id, updateDroneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dronesService.remove(+id);
  }
}
