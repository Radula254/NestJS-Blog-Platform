import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
    constructor(
        /**
         * Injecting Users Service
         */
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,
    ){}
    public login(email: string, password: string, id: string) {
        //Check user exists database
        const user = this.usersService.findOneById('1234')
        //login
        //Token
        return 'Sample_Token'
    }

    public isAuth() {
        return true;
    }
}
