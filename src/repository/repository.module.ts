import { Role, RoleSchema } from './role/role.schema';
import { User, UserSchema } from './user/user.schema';
import {
  Appointment,
  AppointmentSchema,
} from './appointment/appointment.schema';
import { Group, GroupSchema } from './group/group.schema';
import {
  Organization,
  OrganizationSchema,
} from './organization/organization.schema';
import { Slot, SlotSchema } from './slot/slot.schema';
import {
  VirtualRoom,
  VirtualRoomSchema,
} from './virtualRoom/virtualRoom.schema';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleRepository } from './role/role.repository';
import { UserRepository } from './user/user.repository';
import { AppointmentRepository } from './appointment/appointment.repository';
import { GroupRepository } from './group/group.repository';
import { OrganizationRepository } from './organization/organization.repository';
import { SlotRepository } from './slot/slot.repository';
import { VirtualRoomRepository } from './virtualRoom/virtualRoom.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Appointment.name, schema: AppointmentSchema },
      { name: Group.name, schema: GroupSchema },
      { name: Organization.name, schema: OrganizationSchema },
      { name: Slot.name, schema: SlotSchema },
      { name: VirtualRoom.name, schema: VirtualRoomSchema },
    ]),
  ],
  providers: [
    UserRepository,
    RoleRepository,
    AppointmentRepository,
    GroupRepository,
    OrganizationRepository,
    SlotRepository,
    VirtualRoomRepository,
  ],
  exports: [
    UserRepository,
    RoleRepository,
    AppointmentRepository,
    GroupRepository,
    OrganizationRepository,
    SlotRepository,
    VirtualRoomRepository,
  ],
})
export class RepositoryModule {}
