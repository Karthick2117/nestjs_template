import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../models/dto/user/create-user.dto';
import { UserResponseDto } from '../models/dto/user/user-response.dto';
import { Data, List } from '../utils/api/api-types';
import {
  ApiOkResponseData,
  ApiOkResponseList,
} from '../utils/api/api-swagger-utils';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'List users' })
  @ApiOkResponseList(UserResponseDto)
  async getUsers(): Promise<List<UserResponseDto>> {
    const data = await this.usersService.listUsers();
    return { data, total: data.length };
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiOkResponseData(UserResponseDto)
  async createUser(
    @Body() payload: CreateUserDto,
  ): Promise<Data<UserResponseDto>> {
    const data = await this.usersService.createUser(payload);
    return { data };
  }
}
