import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '../common/providers/http.service';
import { Cordinates } from './interfaces/cordinates.interface';
import { LookupDTO } from './interfaces/lookup.dto';
import { DnsService } from '../common/providers/dns.service';

@Injectable()
export class LookupService {
  constructor(public httpService: HttpService, public dnsService: DnsService) {}

  public async getByIp(ip: string): Promise<LookupDTO> {
    const domain = await this.dnsService.reverse(ip);

    if (!domain) {
      throw new NotFoundException('Unable to resolve domain.');
    }

    return this.getByDomain(domain);
  }

  public async getByDomain(domain: string): Promise<LookupDTO> {
    const whoisData = await this.fetchWhoisData(domain);
    const cordinates = await this.fetchCordinates(whoisData.ip);

    whoisData.latitude = cordinates.latitude;
    whoisData.longitude = cordinates.longitude;
    return whoisData;
  }

  private async fetchWhoisData(domain): Promise<LookupDTO> {
    const result = await this.httpService.fetchJson(
      `${process.env.whoisLookupUrl}/?domain=${domain}&format=json`,
      {
        headers: {
          Accept: 'application/json',
          'x-rapidapi-key': process.env.rapidApiKey,
        },
      },
    );

    return {
      ip: result.ips,
      domain: result.name,
      owners: result.contacts?.owner?.map((owner) => {
        return {
          name: owner.name,
          organization: owner.organization,
          country: owner.country,
          region: owner.state,
        };
      }),
    };
  }

  private async fetchCordinates(ip: any): Promise<Cordinates> {
    const response = await this.httpService.fetchJson(
      `${process.env.ipstackUrl}/${ip}?access_key=${process.env.ipstackKey}`,
    );
    return { latitude: response.latitude, longitude: response.longitude };
  }
}
