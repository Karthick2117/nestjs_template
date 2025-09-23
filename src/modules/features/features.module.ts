import { Module } from '@nestjs/common';
import { UsersModule } from './components/users.module';

const featureModules = [
  UsersModule,
  // Add new feature modules here as your application grows
  // e.g., GroupsModule, ClassesModule
];

@Module({
  imports: featureModules,
  exports: featureModules,
})
export class FeaturesModule {}
