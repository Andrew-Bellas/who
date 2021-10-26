import { Test, TestingModule } from '@nestjs/testing';
import { LookupService } from '../../lookup/lookup.service';
import { LookupController } from '../../lookup/lookup.controller';
import { request } from 'http';
import { NotFoundException } from '@nestjs/common';

describe('WhoisController', () => {
  let controller: LookupController;
  let service: LookupService;

  class LookupServiceMock {
    public getByIp() {}
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LookupController],
      providers: [{ provide: LookupService, useClass: LookupServiceMock }],
    }).compile();

    service = module.get<LookupService>(LookupService);
    controller = module.get<LookupController>(LookupController);
  });

  describe('/whoami', () => {
    it('throws a NotFoundException when unable to get IP from request', async () => {
      const mockRequest = {} as Request;
      await expect(controller.getMyIP(mockRequest)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('calls the service with the IP from the request', async () => {
      const mockRequest = { ip: 'example.com' } as any;
      const spy = jest.spyOn(service, 'getByIp');
      await controller.getMyIP(mockRequest);
      expect(spy).toHaveBeenCalledWith(mockRequest.ip);
    });
  });
});
