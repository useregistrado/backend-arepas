import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_PERMISSIONS_KEY } from 'src/decorators/permissions.decorator';
import { PermissionUser } from 'src/users/entities/user.entity';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const { operation, resource } = this.reflector.getAllAndOverride(
      CHECK_PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!operation || !resource) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const { permissions } = user;
    const found = permissions.find(
      (permission: PermissionUser) =>
        permission.method == operation && permission.resource == resource,
    );
    return found;
  }
}
