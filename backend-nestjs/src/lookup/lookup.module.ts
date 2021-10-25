import { Module } from '@nestjs/common';
import { DnsService } from '../common/providers/dns.service';
import { HttpService } from '../common/providers/http.service';
import { LookupController } from './lookup.controller';
import { LookupService } from './lookup.service';

@Module({
  imports: [],
  controllers: [LookupController],
  providers: [LookupService, HttpService, DnsService],
  exports: [LookupService],
})
export class LookupModule {}
