import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  createParamDecorator,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from './roles.decorator';
import { Reflector } from '@nestjs/core/services/reflector.service';
import { HttpResponseError, HttpResponseMessage, Role } from './constant';
import { User } from '@repository/user/user.schema';

@Injectable()
export class GqlAuthGuard extends AuthGuard('gql') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

@Injectable()
export class GqlRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const user = GqlExecutionContext.create(context).getContext().req
      .user as User;

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

    // const hasPermission = requiredRoles.some((role) =>
    //   (user as User).roles.includes(role),
    // );
    return true;

    // if (hasPermission) {
    //   return hasPermission;
    // } else {
    //   throw new HttpException(
    //     HttpResponseError.INSUFFICIENT_PRIVILEGES,
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
  }
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req.user;
  },
);
