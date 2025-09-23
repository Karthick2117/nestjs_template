import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../models/dto/user/create-user.dto';
import { UserResponseDto } from '../models/dto/user/user-response.dto';
import { Data, List } from '../utils/api/api-types';
import { ApiOkResponseData, ApiOkResponseList } from '../utils/api/api-swagger-utils';
import { ParseObjectIdPipe } from '../utils/database/parse-objectid.utils';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'List users' })
  @ApiOkResponseList(UserResponseDto)
  async getUsers(): Promise<List<UserResponseDto>> {
    const data = await this.userService.listUsers();
    return { data, total: data.length };
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiOkResponseData(UserResponseDto)
  async createUser(@Body() payload: CreateUserDto): Promise<Data<UserResponseDto>> {
    const data = await this.userService.createUser(payload);
    return { data };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({ name: 'id', description: 'MongoDB ObjectId', example: '66f0b7c1f2b6a1a9e0c12345' })
  @ApiOkResponseData(UserResponseDto)
  async getUserById(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<Data<UserResponseDto>> {
    const data = await this.userService.findById(id);
    return { data };
  }
}
