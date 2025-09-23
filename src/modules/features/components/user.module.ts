import { Module } from '@nestjs/common';
import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { UserController } from '../../../controllers/user.controller';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Module({
  imports: [TypegooseModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
