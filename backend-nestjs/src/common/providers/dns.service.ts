import { Injectable, NotFoundException } from '@nestjs/common';
import * as dns from 'dns';

@Injectable()
export class DnsService {
  public async reverse(ip: string): Promise<string> {
    return (await dns.promises.reverse(ip))[0];
  }
}
