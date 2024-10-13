import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_PERMISSIONS_KEY } from 'src/decorators/permissions.decorator';
import { PermissionUser } from 'src/users/entities/user.entity';

@Injectable()
export class PermissionGuard implements CanActivate {
  private readonly logger = new Logger(PermissionGuard.name);
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const refelctorGetAll = this.reflector.getAllAndOverride(
      CHECK_PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest();

    if (!refelctorGetAll) {
      const endpoint = request.route.path;
      const method = request.method;
      this.logger.error(
        `El endpoint ${endpoint} ${method} no tiene un CheckPermissions configurado`,
      );
      return false;
    }

    const { operation, resource } = refelctorGetAll;

    if (!operation || !resource) {
      return false;
    }

    const user = request.user;
    const { permissions } = user;
    const found = permissions.find(
      (permission: PermissionUser) =>
        permission.method == operation && permission.resource == resource,
    );
    return found;
  }
}
