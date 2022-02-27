import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
export const AccessAdmin = () => Roles(Role.ADMIN);
export const AccessUser = () => Roles(Role.USER);
export const AccessAdminAndUser = () => Roles(Role.ADMIN, Role.USER);
export const AccessAll = () => SetMetadata(ROLES_KEY, false); //Need logged in