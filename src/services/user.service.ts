import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@m8a/nestjs-typegoose';
import { plainToInstance } from 'class-transformer';
import type { ReturnModelType } from '@typegoose/typegoose';
import { CreateUserDto } from '../models/dto/user/create-user.dto';
import { UserResponseDto } from '../models/dto/user/user-response.dto';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async listUsers(): Promise<UserResponseDto[]> {
    const docs = await this.userModel.find().lean().exec();
    if (!docs) throw new NotFoundException(`No users found`);
    return plainToInstance(UserResponseDto, docs, {
      excludeExtraneousValues: true,
    });
  }

  async createUser(payload: CreateUserDto): Promise<UserResponseDto> {
    const created = await this.userModel.create(payload);
    return plainToInstance(UserResponseDto, created.toObject(), {
      excludeExtraneousValues: true,
    });
  }

  async findById(id: string): Promise<UserResponseDto> {
    const doc = await this.userModel.findById(id).lean().exec();
    if (!doc) throw new NotFoundException(`User with id "${id}" not found`);
    return plainToInstance(UserResponseDto, doc, {
      excludeExtraneousValues: true,
    });
  }
}
