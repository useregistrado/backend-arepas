import { Test, TestingModule } from '@nestjs/testing';
import { EndpointsAutoregisterService } from './endpoints-autoregister.service';

describe('EndpointsAutoregisterService', () => {
  let service: EndpointsAutoregisterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EndpointsAutoregisterService],
    }).compile();

    service = module.get<EndpointsAutoregisterService>(EndpointsAutoregisterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
