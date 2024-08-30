import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
    constructor(private userService:UserService){}

    @UseGuards(AuthGuard)
    @Get('listUser')
    findAll(): Promise<User[]>{
        return this.userService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get('search/:id')
    findOne(@Param('id') id: string): Promise<User>{
        return this.userService.findOne(Number(id)) ;
    }  
    
    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req): Promise<User> {
        // Truy xuất ID từ token được lưu trong request
        const userId = req['user_data'].id;
        return this.userService.getProfile(userId);
    }
    
    @UseGuards(AuthGuard)
    @Post('create')
    create(@Body() createUserDto:CreateUserDto ):Promise<User>{
        return this.userService.create(createUserDto) ;
    }

    @UseGuards(AuthGuard)
    @Put('update/:id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(Number(id), updateUserDto);
    }

    @UseGuards(AuthGuard)
    @Delete('delete/:id')
    delete(@Param('id') id:string){
        return this.userService.delete(Number(id));
    }
    

}

