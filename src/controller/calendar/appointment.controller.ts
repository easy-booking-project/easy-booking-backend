import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppointmentRepository } from '@repository/appointment/appointment.repository';
import { Appointment } from '@repository/appointment/appointment.schema';
import { JwtAuthGuard } from '@service/auth/jwt-auth.guard';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  @Get('/fetch')
  async fetchAllAppointments() {
    return await this.appointmentRepository.find({});
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Body() appointment: Partial<Appointment>) {
    return await this.appointmentRepository.insert(appointment);
  }
}
