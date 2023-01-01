import { SetMetadata } from "@nestjs/common";

export enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
}

export const Roles = (...args: string[]) => {
  return SetMetadata('roles', args)
}