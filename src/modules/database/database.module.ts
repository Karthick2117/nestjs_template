import { Module } from '@nestjs/common';
import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { getMongoUri } from '../../utils/mongo.util';

@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useFactory: () => ({
        uri: getMongoUri(),
      }),
    }),
  ],
  exports: [TypegooseModule],
})
export class DatabaseModule {}
