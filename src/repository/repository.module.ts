import { Role, RoleSchema } from './role/role.schema';
import { User, UserSchema } from './user/user.schema';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleRepository } from './role/role.repository';
import { UserRepository } from './user/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  providers: [UserRepository, RoleRepository],
  exports: [UserRepository, RoleRepository],
})
export class RepositoryModule {}
