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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { DronesService } from './drones.service';
import { CreateDroneDto } from './dto/create-drone.dto';
import { UpdateDroneDto } from './dto/update-drone.dto';
import { CreateMedicationDto } from '../medications/dto/create-medication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { GlobalUtil } from '../shared/config/global';

@Controller('drone')
export class DronesController {
  constructor(private readonly dronesService: DronesService) {}

  @Post('register')
  registerDrone(@Body() createDroneDto: CreateDroneDto) {
    return this.dronesService.registerDrone(createDroneDto);
  }

  @Put('load/medication')
  @UseInterceptors(
    FileInterceptor('medicationPhoto', {
      fileFilter: GlobalUtil.validateDocumentMimeType(
        /\/(jpg|jpeg|png|pdf|pptx|xlsx)$/i,
      ),
    }),
  )
  async loadDrone(
    @Query('droneId') droneId: string,
    @Body() createMedicationDto: CreateMedicationDto,
    @UploadedFile() medicationFile?: Express.Multer.File,
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

  @Get('/available/all')
  async checkAvailableDrones() {
    return await this.dronesService.checkAvailableDrones();
  }

  @Get()
  async checkDroneBatteryLevel(@Query('droneId') droneId: string) {
    return await this.dronesService.checkDroneBatteryLevel(droneId);
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
