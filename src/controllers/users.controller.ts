import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../models/requests/dto/create-user.dto';
import { UserResponseDto } from '../models/responses/dto/user-response.dto';
import { Data, List } from '../utils/api/api-types';
import { ApiOkResponseData, ApiOkResponseList } from '../utils/api/api-swagger-utils';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponseList(UserResponseDto)
  async getUsers(): Promise<List<UserResponseDto>> {
    const data = await this.usersService.listUsers();
    return { data, total: data.length };
  }

  @Post()
  @ApiOkResponseData(UserResponseDto)
  async createUser(
    @Body() payload: CreateUserDto,
  ): Promise<Data<UserResponseDto>> {
    const data = await this.usersService.createUser(payload);
    return { data };
  }
}
