import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetaSearchGateway } from './metaSearch.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MetaSearchGateway],
})
export class AppModule {}
