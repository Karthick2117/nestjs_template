import { Injectable } from '@nestjs/common';
import { InjectModel } from '@m8a/nestjs-typegoose';
import type { ReturnModelType } from '@typegoose/typegoose';
import type { Types } from 'mongoose';
import { CreateUserDto } from '../models/requests/dto/create-user.dto';
import { User } from '../models/user.model';

type UserPlain = {
  _id: Types.ObjectId | string;
  name: string;
  email: string;
  bio?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  listUsers(): Promise<UserPlain[]> {
    return this.userModel.find().lean().exec();
  }

  async createUser(payload: CreateUserDto): Promise<UserPlain> {
    const created = await this.userModel.create(payload);
    return created.toObject();
  }
}
