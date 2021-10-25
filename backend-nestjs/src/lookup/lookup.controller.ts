import { Controller, Get, Param, Req, Request } from '@nestjs/common';
import { LookupDTO } from './interfaces/lookup.dto';
import { LookupService } from './lookup.service';

@Controller()
export class LookupController {
  constructor(public readonly whoisService: LookupService) {}

  @Get('whois/ip/:ip')
  async getIp(@Param() ip: string): Promise<LookupDTO> {
    return this.whoisService.getByIp(ip);
  }

  @Get('whois/domain/:domain')
  async getDomain(@Param('domain') domain: string): Promise<LookupDTO> {
    console.log(domain);
    return this.whoisService.getByDomain(domain);
  }

  @Get('whoami')
  async getMyIP(@Req() req: Request): Promise<LookupDTO> {
    return this.whoisService.getByIp((await req.json()).id);
  }
}
