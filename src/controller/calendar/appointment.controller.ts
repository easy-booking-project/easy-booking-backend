import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppointmentRepository } from '@repository/appointment/appointment.repository';
import { Appointment } from '@repository/appointment/appointment.schema';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  @Get('/fetch')
  async fetchAllAppointments() {
    return await this.appointmentRepository.find({});
  }

  @Post('/create')
  async create(@Body() appointment: Partial<Appointment>) {
    return await this.appointmentRepository.insert(appointment);
  }
}
