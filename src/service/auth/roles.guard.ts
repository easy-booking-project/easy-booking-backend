import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { HttpResponseError, HttpResponseMessage } from './constant';

import { ROLES_KEY } from './roles.decorator';
import { Reflector } from '@nestjs/core';
import { Roles } from '@repository/role/role.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
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

    // TODO implement super user which has permission to all api
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
