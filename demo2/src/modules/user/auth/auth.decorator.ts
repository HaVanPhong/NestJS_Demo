import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
// import { Roles } from '../../../common/constant/role';
import { RolesGuard } from 'src/modules/user/auth/roles.guard';
import { JwtStrategy } from 'src/modules/user/auth/jwt.strategy';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/constant/role';

export function Auth(...roles: string[]) {
  console.log(roles);

  return applyDecorators(
    Roles(...roles),
    UseGuards(JwtStrategy, AuthGuard(), RolesGuard),
  );
}
