import { Role, RoleSchema } from './role/role.schema';
import { User, UserSchema } from './user/user.schema';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleService } from './role/role.service';
import { UserService } from './user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  providers: [UserService, RoleService],
  exports: [UserService, RoleService],
})
export class RepositoryModule {}
