import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../models/requests/dto/create-user.dto';
import { UserResponseDto } from '../models/responses/dto/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): Promise<UserResponseDto[]> {
    return this.usersService.listUsers();
  }

  @Post()
  createUser(@Body() payload: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.createUser(payload);
  }
}
