import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
// import { User } from '../objects/user';
import { HttpResponseError, HttpResponseMessage, Role } from './constant';

import { ROLES_KEY } from './roles.decorator';
import { Reflector } from '@nestjs/core';
import { User } from '@repository/user/user.schema';
// import { HttpResponseError, HttpResponseMessage, Role } from '../enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const user = context.switchToHttp().getRequest().user;

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: HttpResponseError.USER_NOT_FOUND,
          message: HttpResponseMessage.USER_NOT_FOUND,
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const hasPermission = requiredRoles.some((role) =>
      user.roles.includes(role),
    );

    if (hasPermission) {
      return hasPermission;
    } else {
      throw new HttpException(
        HttpResponseError.INSUFFICIENT_PRIVILEGES,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
