import { SetMetadata } from '@nestjs/common';
import { Roles } from '@repository/role/role.schema';

export const ROLES_KEY = 'roles';
export const AllowRoles = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles);
