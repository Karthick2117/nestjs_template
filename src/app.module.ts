import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { DatabaseModule } from './modules/database/database.module';
import { FeaturesModule } from './modules/features/features.module';

@Module({
  imports: [DatabaseModule, FeaturesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
