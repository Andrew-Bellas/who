import { Module } from '@nestjs/common';
import { HttpService } from 'src/common/providers/http.service';
import { WhoisController } from './whois.controller';
import { WhoisService } from './whois.service';

@Module({
  imports: [],
  controllers: [WhoisController],
  providers: [WhoisService, HttpService],
  exports: [WhoisService]
})

export class WhoisModule {}
