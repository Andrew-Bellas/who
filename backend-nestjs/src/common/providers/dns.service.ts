import { Injectable } from '@nestjs/common';
import dns from 'dns';

@Injectable()
export class DnsService {
  public async reverse(ip: string): Promise<string> {
    return dns.promises.reverse(ip)[0]
  }
}
