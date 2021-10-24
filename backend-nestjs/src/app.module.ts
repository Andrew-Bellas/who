import { Module } from '@nestjs/common';
import { WhoisController } from './whois/whois.controller';
import { WhoisModule } from './whois/whois.module';

@Module({
  imports: [WhoisModule],
  controllers: [WhoisController],
  providers: [],
})
export class AppModule {}
