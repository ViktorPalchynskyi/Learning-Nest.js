import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;
    const testUser = {
        email: 'test@test.com',
        password: '111test111',
    };

    beforeEach(async () => {
        // Create a fake copy of the users service
        const users: User[] = [];

        fakeUsersService = {
            find: (email: string) => {
                const filterdUsers = users.filter((user) => user.email === email);

                return Promise.resolve(filterdUsers);
            },
            create: (email: string, password: string) => {
                const newUser = { id: Math.round(Math.random() * 999), email, password } as User;

                users.push(newUser);

                return Promise.resolve(newUser);
            },
        };

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUsersService,
                },
            ],
        }).compile();

        service = module.get(AuthService);
    });

    it('can create an instance of auth service', async () => {
        expect(service).toBeDefined();
    });

    it('creates a new user with a salted and hashed password', async () => {
        const user = await service.signup(testUser.email, testUser.password);
        const [salt, hash] = user.password.split('.');

        expect(user.password).not.toEqual(testUser.password);
        expect(hash).toBeDefined();
        expect(salt).toBeDefined();
        expect(salt).toHaveLength(16);
    });

    it('throws an error if user signs up with email that is in use', async () => {
        const { email, password } = testUser;

        fakeUsersService.find = () => Promise.resolve([{ id: 1, email, password } as User]);
        await expect(service.signup(email, password)).rejects.toThrow(BadRequestException);
    });

    it('throws if signin is called with an unused email', async () => {
        await expect(service.signin(testUser.email, testUser.password)).rejects.toThrow(NotFoundException);
    });

    it('throws if an invalid password is provided', async () => {
        const { email, password } = testUser;

        fakeUsersService.find = () => Promise.resolve([{ email, password } as User]);
        await expect(service.signin(email, 'fakepassword')).rejects.toThrow(BadRequestException);
    });

    it('returns a user if correct password is provided', async () => {
        const { email, password } = testUser;

        await service.signup(email, password);
        const user = await service.signin(email, password);

        expect(user).toBeDefined();
    });
});
