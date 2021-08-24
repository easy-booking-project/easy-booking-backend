import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from '@repository/appointment/appointment.repository';

Injectable();
export class AppointmentService {
  constructor(private appointmentRepository: AppointmentRepository) {}
}
