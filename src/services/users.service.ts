import { Injectable } from '@nestjs/common';
import { InjectModel } from '@m8a/nestjs-typegoose';
import type { ReturnModelType } from '@typegoose/typegoose';
import { CreateUserDto } from '../modules/users/dto/create-user.dto';
import { User } from '../models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  listUsers() {
    return this.userModel.find().lean().exec();
  }

  createUser(payload: CreateUserDto) {
    return this.userModel.create(payload);
  }
}
