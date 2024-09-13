import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
    constructor(private userSirvice: UsersService) {}

    async signup(email: string, password: string) {
        // See if email is in use
        const users = await this.userSirvice.find(email);

        if (users.length) throw new BadRequestException('email in use');
        // Hash the users password
        // Create a new user and seve it
        // return the user
    }

    signin() {}
}
