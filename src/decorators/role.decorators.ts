import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '../enums/role.enum';
import { RoleGuard } from '../guards/role.guard';
import { JwtAuthGuard } from '../modules/auth/guards/jwt-auth-guard';
export const ROLES_KEY = 'roles';

export const Roles = (...roles: Role[]) =>
  applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(JwtAuthGuard, RoleGuard),
  );
