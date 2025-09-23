import { Module } from '@nestjs/common';
import { UserModule } from './components/user.module';

const featureModules = [
  UserModule,
  // Add new feature modules here as your application grows
  // e.g., GroupsModule, ClassesModule
];

@Module({
  imports: featureModules,
  exports: featureModules,
})
export class FeaturesModule {}
