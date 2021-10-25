import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LookupController } from './lookup/lookup.controller';
import { LookupModule } from './lookup/lookup.module';

@Module({
  imports: [ConfigModule.forRoot(), LookupModule],
  controllers: [LookupController],
  providers: [],
})
export class AppModule {}
