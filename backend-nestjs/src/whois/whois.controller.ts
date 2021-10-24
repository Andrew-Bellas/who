import { Controller, Get, Param } from '@nestjs/common';
import { WhoisDTO } from './interfaces/whois.dto';
import { WhoisService } from './whois.service';

@Controller('whois')
export class WhoisController {
    constructor(public readonly whoisService: WhoisService) {}

    @Get('ip/:ip')
    async getIp(@Param() ip: string): Promise<WhoisDTO> {
      return this.whoisService.getByIp(ip);
    }

    @Get('domain/:domain')
    async getDomain(@Param() domain: string): Promise<WhoisDTO> {
      return this.whoisService.getByDomain(domain);
    }
}
