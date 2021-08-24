import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppointmentRepository } from '@repository/appointment/appointment.repository';
import { Appointment } from '@repository/appointment/appointment.schema';
import { UserEntity } from '@repository/user/user.schema';
import { JwtAuthGuard } from '@service/auth/jwt-auth.guard';
import { UserInfo } from '@service/auth/user.decorator';
import { HttpResponseError, HttpStatus } from '@service/auth/constant';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  @Get('/fetch-all')
  async fetchAllAppointments() {
    return await this.appointmentRepository.find({});
  }

  @UseGuards(JwtAuthGuard)
  @Get('/fetch')
  async fetchAppointment(@UserInfo() user: UserEntity) {
    return await this.appointmentRepository.find({
      participants: user.id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(
    @Body() appointment: Partial<Appointment>,
    @UserInfo() user: UserEntity,
  ) {
    appointment.createdBy = user.id;
    appointment.createdOn = new Date();

    return await this.appointmentRepository.insert(appointment);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update')
  async update(@Body() appointment: Partial<Appointment>) {
    try {
      const appointmentId = appointment.id;

      return await this.appointmentRepository.update(
        { id: appointmentId },
        appointment,
      );
    } catch (e) {
      console.error(e);

      throw new HttpException(
        {
          status: HttpStatus.NOT_MODIFIED,
          error: HttpResponseError.NOT_MODIFIED,
        },
        HttpStatus.NOT_MODIFIED,
      );
    }
  }
}
