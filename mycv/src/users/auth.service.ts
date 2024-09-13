import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private userSirvice: UsersService) {}

    async signup(email: string, password: string) {
        // See if email is in use
        const users = await this.userSirvice.find(email);

        if (users.length) throw new BadRequestException('email in use');
        // Hash the users password
        // Generate a salt
        const salt = randomBytes(8).toString('hex');
        console.log(salt);
        // Hash the salt and the password together
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        // Join the hashed result and the salt together
        const reslut = `${salt}.${hash.toString('hex')}`;

        // Create a new user and seve it
        // return the user
    }

    signin() {}
}
