import { Body, Controller, Post, Get, Patch, Param, Query, Delete } from '@nestjs/common';
import { CreateUserDto } from './dtos/crate-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {
    constructor(private userSirvice: UsersService) {}

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        console.log(body);
        const { email, password } = body;

        this.userSirvice.create(email, password);
    }

    @Get('/:id')
    getUser(@Param('id') id: string) {
        return this.userSirvice.findOne(Number(id));
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
