import { Test, TestingModule } from '@nestjs/testing';
import { DnsService } from '../../common/providers/dns.service';
import { Cordinates } from '../../lookup/interfaces/cordinates.interface';
import { HttpService } from '../../common/providers/http.service';
import { LookupService } from '../../lookup/lookup.service';
import { NotFoundException } from '@nestjs/common';

describe('LookupService', () => {
  let service: LookupService;
  let httpService: HttpService;
  let whoisLookupData: any;
  let cordinateLookupData: Cordinates;
  let dnsService: DnsService;

  class HttpServiceMock {
    public fetchJson() {}
  }

  class DnsServiceMock {
    public reverse() {}
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LookupService,
        { provide: HttpService, useClass: HttpServiceMock },
        { provide: DnsService, useClass: DnsServiceMock },
      ],
    }).compile();

    service = module.get<LookupService>(LookupService);
    httpService = module.get<HttpService>(HttpService);
    dnsService = module.get<DnsService>(DnsService);

    whoisLookupData = {
      ips: '1.1.1.1',
      name: 'example.com',
      contacts: {
        owner: [
          {
            name: 'owner',
            organization: 'org',
            country: 'USA',
            state: 'MO',
          },
        ],
      },
    };
    cordinateLookupData = {
      longitude: '39.08844340316974',
      latitude: '-94.58981535016802',
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('.getByDomain', () => {
    it('returns the lookup data by domain', async () => {
      jest
        .spyOn(httpService, 'fetchJson')
        .mockResolvedValueOnce(whoisLookupData);
      jest
        .spyOn(httpService, 'fetchJson')
        .mockResolvedValueOnce(cordinateLookupData);

      expect(await service.getByDomain('domain')).toEqual({
        ip: '1.1.1.1',
        domain: 'example.com',
        longitude: '39.08844340316974',
        latitude: '-94.58981535016802',
        owners: [
          {
            region: 'MO',
            country: 'USA',
            name: 'owner',
            organization: 'org',
          },
        ],
      });
    });
  });

  describe('.getByIp', () => {
    let spy;

    beforeEach(() => {
      spy = jest
        .spyOn(service, 'getByDomain')
        .mockImplementation(() => Promise.resolve({} as any));
    });

    it('calls .getByDomain with the reverse looked-up domain', async () => {
      const spy = jest
        .spyOn(service, 'getByDomain')
        .mockImplementation(() => Promise.resolve({} as any));
      jest.spyOn(dnsService, 'reverse').mockResolvedValue('example.com');

      await service.getByIp('1.1.1.1');
      expect(spy).toHaveBeenCalledWith('example.com');
    });

    it('returns a 404 when the domain can not be looked up', async () => {
      jest.spyOn(dnsService, 'reverse').mockResolvedValue(undefined);

      await expect(service.getByIp('1.1.1.1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
