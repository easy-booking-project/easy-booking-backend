import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppointmentRepository } from '@repository/appointment/appointment.repository';
import { Appointment } from '@repository/appointment/appointment.schema';
import { UserEntity } from '@repository/user/user.schema';
import { JwtAuthGuard } from '@service/auth/jwt-auth.guard';
import { UserInfo } from '@service/auth/user.decorator';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  @Get('/fetchAll')
  async fetchAllAppointments() {
    return await this.appointmentRepository.find({});
  }

  @UseGuards(JwtAuthGuard)
  @Get('/fetch')
  async fetchAppointmentsById(@UserInfo() user: UserEntity) {
    return await this.appointmentRepository.find({
      participants: user.username,
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
}
