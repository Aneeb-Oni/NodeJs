import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { BlockGuard } from '../guards/block.guard';
import { BlockRole } from '../enums/block.enum';
import { JwtAuthGuard } from '../modules/auth/guards/jwt-auth-guard';

export const ROLES_KEY = 'roles';

export const BlockRoles = (...roles: BlockRole[]) =>
  applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(JwtAuthGuard, BlockGuard),
  );
