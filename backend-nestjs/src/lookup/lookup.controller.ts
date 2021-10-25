import { Controller, Get, NotFoundException, Param, Req, Request } from '@nestjs/common';
import { LookupDTO } from './interfaces/lookup.dto';
import { LookupService } from './lookup.service';

@Controller()
export class LookupController {
  constructor(public readonly whoisService: LookupService) {}

  @Get('whois/ip/:ip')
  async getIp(@Param('ip') ip: string): Promise<LookupDTO> {
    return this.whoisService.getByIp(ip);
  }

  @Get('whois/domain/:domain')
  async getDomain(@Param('domain') domain: string): Promise<LookupDTO> {
    return this.whoisService.getByDomain(domain);
  }

  @Get('whoami')
  async getMyIP(@Request() req): Promise<LookupDTO> {
    if(!req.ip) {
      throw new NotFoundException('IP Not Found')
    }
    return this.whoisService.getByIp(req.ip);
  }
}
