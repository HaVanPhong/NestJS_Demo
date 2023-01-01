import { 
  applyDecorators,
  UseGuards 
} from '@nestjs/common';
import { Roles } from '../../../constant/role';
import { RolesGuard } from 'src/modules/user/auth/roles.guard';
import { JwtStrategy } from 'src/modules/user/auth/jwt.strategy';
import { AuthGuard } from '@nestjs/passport';

export function Auth(...roles: string[]) {
  return applyDecorators(
    Roles(...roles),
    UseGuards(JwtStrategy, AuthGuard(), RolesGuard)
  );
}