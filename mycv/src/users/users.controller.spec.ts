import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
    let controller: UsersController;

    let fakeUsersService: Partial<UsersService>;
    let fakeAuthService: Partial<AuthService>;
    const testUser = {
        email: 'test@test.com',
        password: '111test111',
    };

    beforeEach(async () => {
        const { email, password } = testUser;

        fakeUsersService = {
            findOne: (id) => Promise.resolve({ id, email, password } as User),
            find: (email) => Promise.resolve([{ id: 1, email, password } as User]),
            // remove: (id) => {},
            // update: (id, attrs) => {},
        };

        fakeAuthService = {
            // signup: () => {},
            // signin: () => {},
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: fakeUsersService,
                },
                {
                    provide: AuthService,
                    useValue: fakeAuthService,
                },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('findAllUsers returns a list of users with the given email', async () => {
        const users = await controller.getAllUsers(testUser.email);

        expect(users.length).toEqual(1);
        expect(users[0].email).toEqual(testUser.email);
    });

    it('findUser returns a single user with the given id', async () => {
        const user = await controller.getUser('1');

        expect(user).toBeDefined();
    });

    it('findUser throws an error if user with given id is not found', async () => {
        fakeUsersService.findOne = () => null;
        await expect(controller.getUser('1')).rejects.toThrow(NotFoundException);
    });
});
