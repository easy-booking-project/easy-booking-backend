import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository/repository.module';
import { UserController } from './user/user.controller';
import { RoleController } from './role/role.controller';
import { AuthenticationController } from './authentication/authentication.controller';

@Module({
  imports: [RepositoryModule],
  controllers: [UserController, RoleController, AuthenticationController],
})
export class ControllerModule {}
