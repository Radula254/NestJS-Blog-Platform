// providers/users.service.ts

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/providers/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  /**
   * Find all users (with pagination or other filters as needed)
   */
  public findAll(limit: number, page: number) {
    const isAuth = this.authService.isAuth();
    console.log('Is Authenticated?', isAuth);

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
