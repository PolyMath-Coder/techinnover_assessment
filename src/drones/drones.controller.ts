import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DronesService } from './drones.service';
import { CreateDroneDto } from './dto/create-drone.dto';
import { UpdateDroneDto } from './dto/update-drone.dto';
import { CreateMedicationDto } from '../medications/dto/create-medication.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('drone')
export class DronesController {
  constructor(private readonly dronesService: DronesService) {}

  @Post('register')
  registerDrone(@Body() createDroneDto: CreateDroneDto) {
    return this.dronesService.registerDrone(createDroneDto);
  }

  @Put('load/medication')
  async loadDrone(
    @Query('droneId') droneId: string,
    @Body() createMedicationDto: CreateMedicationDto,
  ) {
    try {
      return await this.dronesService.loadDrone(droneId, createMedicationDto);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.response?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('check/items/:droneId')
  checkDroneMedItems(@Param('droneId') droneId: string) {
    return this.dronesService.checkMedItems(droneId);
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
