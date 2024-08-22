import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('register')
    @ApiResponse({ status: 201, description: 'Register Successfully!' })
    @ApiResponse({ status: 409, description: 'Register fail! Email is exist.' })
    register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
        console.log('Register DTO:', registerUserDto);
        return this.authService.register(registerUserDto);
    }

    @Post('login')
    @ApiResponse({ status: 201, description: 'Login Successfully!' })
    @ApiResponse({ status: 401, description: 'Login failed! Email or Password is not correct.' })
    @UsePipes(ValidationPipe)
    login(@Body() loginUserDto: LoginUserDto): Promise<any> {
        console.log('Login attempt:', loginUserDto);
        return this.authService.login(loginUserDto);
    }
    
    @Post('refresh-token')
    refreshToken(@Body() { refresh_token }: { refresh_token: string }): Promise<any> {
        console.log('refresh token api');
        return this.authService.refreshToken(refresh_token);
    }

    @Post('logout')
@ApiResponse({ status: 200, description: 'Logout Successfully!' })
@ApiResponse({ status: 400, description: 'Logout failed!' })
@UsePipes(ValidationPipe)
async logout(@Body() { email }: { email: string }): Promise<void> {
    // Kiểm tra giá trị email nhận được
    console.log('Logout request for email:', email);
    return this.authService.logout(email);
}

}
