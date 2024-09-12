import { Body, Controller, Post, Get, Patch, Param, Query, Delete, NotFoundException, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/crate-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
export class UsersController {
    constructor(private userSirvice: UsersService) {}

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        console.log(body);
        const { email, password } = body;

        this.userSirvice.create(email, password);
    }

    // @UseInterceptors(new SerializeInterceptor(UserDto))
    @Serialize(UserDto)
    @Get('/:id')
    async getUser(@Param('id') id: string) {
        console.log('hendler is running');
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
