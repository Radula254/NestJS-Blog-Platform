import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  Body,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * GET /users -> Returns a list of users
   */
  @Get()
  @ApiOperation({ summary: 'Fetches a list of registered users on the application' })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'Number of entries returned per query',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'Page number you want the API to return',
    example: 1,
  })
  public getUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.findAll(limit, page);
  }

  /**
   * GET /users/:id -> Returns a single user
   * We validate `id` as a number, then convert it to a string
   */
  @Get('/:id')
  @ApiOperation({ summary: 'Fetches a user by numeric ID' })
  @ApiResponse({
    status: 200,
    description: 'User fetched successfully by ID',
  })
  public getUser(@Param() getUserParamDto: GetUsersParamDto) {
    // Because of the DTO, `getUserParamDto.id` is a number.
    // We'll convert it to a string here:
    const userIdAsString = getUserParamDto.id.toString();
    return this.usersService.findOneById(userIdAsString);
  }

  /**
   * POST /users -> Create a new user
   */
  @Post()
  public createUsers(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  /**
   * PATCH /users -> Patch an existing user
   */
  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return 'You sent a PATCH request to the /users endpoint';
  }
}
