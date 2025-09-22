import { Injectable } from '@nestjs/common';
import { InjectModel } from '@m8a/nestjs-typegoose';
import { plainToInstance } from 'class-transformer';
import type { ReturnModelType } from '@typegoose/typegoose';
import { CreateUserDto } from '../models/requests/dto/create-user.dto';
import { UserResponseDto } from '../models/responses/dto/user-response.dto';
import { User } from '../models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async listUsers(): Promise<UserResponseDto[]> {
    const docs = await this.userModel.find().lean().exec();
    return plainToInstance(UserResponseDto, docs, { excludeExtraneousValues: true });
  }

  async createUser(payload: CreateUserDto): Promise<UserResponseDto> {
    const created = await this.userModel.create(payload);
    return plainToInstance(UserResponseDto, created.toObject(), {
      excludeExtraneousValues: true,
    });
  }
}
