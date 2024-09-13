import { Body, Controller, Post, Get, Patch, Param, Query, Delete, NotFoundException, Session } from '@nestjs/common';
import { CreateUserDto } from './dtos/crate-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(
        private userSirvice: UsersService,
        private authService: AuthService
    ) {}

    @Get('/colors/:color')
    setColor(@Param('color') color: string, @Session() session: any) {
        session.color = color;
    }

    @Get('/colors')
    getColor(@Session() session: any) {
        return session.color;
    }

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        const { email, password } = body;

        this.authService.signup(email, password);
    }

    @Post('/signin')
    signin(@Body() body: CreateUserDto) {
        const { email, password } = body;

        return this.authService.signin(email, password);
    }

    @Get('/:id')
    async getUser(@Param('id') id: string) {
        const user = await this.userSirvice.findOne(Number(id));

        if (!user) throw new NotFoundException('user not found');

        return user;
    }

    @Get()
    getAllUsers(@Query('email') email: string) {
        return this.userSirvice.find(email);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string) {
        return this.userSirvice.remove(Number(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.userSirvice.update(Number(id), body);
    }
}
