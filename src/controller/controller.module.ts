import { AuthenticationController } from './authentication/authentication.controller';
import { Module } from '@nestjs/common';
import { RepositoryModule } from '@repository/repository.module';
import { RoleController } from './role/role.controller';
import { ServiceModule } from '@service/service.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [RepositoryModule, ServiceModule],
  controllers: [UserController, RoleController, AuthenticationController],
})
export class ControllerModule {}
