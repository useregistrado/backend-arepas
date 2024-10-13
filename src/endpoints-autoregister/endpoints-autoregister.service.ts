import { Injectable, RequestMethod } from '@nestjs/common';
import { DiscoveryService, Reflector, MetadataScanner } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Permissions } from 'src/rolesandpermissions/entities/permissions.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EndpointsAutoregisterService {
  constructor(
    @InjectRepository(Permissions)
    private permissionRepository: Repository<Permissions>,
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
    private readonly metadataScanner: MetadataScanner, // Usar MetadataScanner para explorar los métodos
  ) {}

  onModuleInit() {
    const controllers: InstanceWrapper[] =
      this.discoveryService.getControllers();

    controllers.forEach((wrapper: InstanceWrapper) => {
      const { instance, metatype } = wrapper;
      if (!instance) return;

      // Obtener el path base del controlador
      const controllerPath = this.reflector.get<string>('path', metatype);

      // Usar MetadataScanner para recorrer los métodos del controlador
      this.metadataScanner.scanFromPrototype(
        instance,
        Object.getPrototypeOf(instance),
        (methodName) => {
          const targetCallback = instance[methodName];
          const routePath = this.reflector.get<string>('path', targetCallback); // Obtener la ruta del método
          const requestMethod: RequestMethod =
            this.reflector.get<RequestMethod>('method', targetCallback);

          if (routePath && requestMethod !== undefined) {
            const fullPath = `${controllerPath}${routePath}`;
            const method = RequestMethod[requestMethod];
            this.save(controllerPath, fullPath, method);
          }
        },
      );
    });
  }

  async save(controllerPath: string, fullPath: string, method: string) {
    const permission = await this.permissionRepository.findOneBy({
      full_path: fullPath,
      method,
    });

    if (permission) return;
    /* this.permissionRepository.save({
      controller_path: controllerPath,
      full_path: fullPath,
      method,
    }); */
  }
}
