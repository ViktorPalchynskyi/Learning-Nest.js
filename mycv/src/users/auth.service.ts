import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(_scrypt);
const keylen = 32;

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
        // Hash the salt and the password together
        const hash = (await scrypt(password, salt, keylen)) as Buffer;

        // Join the hashed result and the salt together
        const hashedPassword = `${salt}.${hash.toString('hex')}`;

        // Create a new user and seve it
        const user = await this.userSirvice.create(email, hashedPassword);

        // return the user

        return user;
    }

    async signin(email: string, password: string) {
        const [user] = await this.userSirvice.find(email);

        if (!user) {
            throw new NotFoundException('user not found');
        }

        const [salt, storedHash] = user.password.split('.');

        const hash = (await scrypt(password, salt, keylen)) as Buffer;

        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('bad password');
        }

        return user;
    }
}
