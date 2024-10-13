import { SetMetadata } from '@nestjs/common';

export const CHECK_PERMISSIONS_KEY = 'check_permissions';
export const CheckPermissions = (operation: string, resource: string) =>
  SetMetadata(CHECK_PERMISSIONS_KEY, { operation, resource });
