// providers/users.service.ts
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/providers/auth.service';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

/**
 * Class to connect to users table and perform business operations
 */
@Injectable()
export class UsersService {
  // constructor(
  //   @Inject(forwardRef(() => AuthService))
  //   private readonly authService: AuthService,
  // ) {}

  constructor(
    /**
     * Injecting usersRepository
     */
    @InjectRepository(User)
    private usersRepository:Repository<User>,
  ){}

  public async createUser(createUserDto: CreateUserDto) {
    // Check if user with same email exists
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    })
    // Handle exeptions

    // Create a new user
    let newUser = this.usersRepository.create(createUserDto);
    newUser = await this.usersRepository.save(newUser);

    return newUser;
  }

  /**
   * Find all users (with pagination or other filters as needed)
   */
  public findAll(limit: number, page: number) {
    // const isAuth = this.authService.isAuth();
    // console.log('Is Authenticated?', isAuth);

    // Hard-coded demo data
    return [
      {
        firstName: 'John',
        email: 'john@doe.com',
      },
      {
        firstName: 'Alice',
        email: 'alice@doe.com',
      },
    ];
  }

  /**
   * Find user(s) by ID
   */
  public findOneById(id: string) {
    // Hard-coded demo data returning a single user in an array
    return [
      {
        id,
        firstName: 'Alice',
        email: 'alice@doe.com',
      },
    ];
  }
}
