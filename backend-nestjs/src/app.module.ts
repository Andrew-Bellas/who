import { Module } from '@nestjs/common';
import { WhoisController } from './lookup/whois.controller';
import { WhoisModule } from './lookup/whois.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), WhoisModule],
  controllers: [WhoisController],
  providers: [],
})
export class AppModule {}
