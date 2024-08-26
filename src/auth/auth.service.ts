import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    async register(registerUserDto: RegisterUserDto): Promise<User> {
        // Kiểm tra email trùng lặp
        const existingUser = await this.userRepository.findOne({
            where: { email: registerUserDto.email }
        });
    
        if (existingUser) {
            throw new HttpException('Email đã tồn tại', HttpStatus.CONFLICT);
        }
    
        const hashPassword = await this.hashPassword(registerUserDto.password);
    
        // Lấy ID lớn nhất hiện tại
        const maxIdUser = await this.userRepository.createQueryBuilder('user')
            .select('MAX(user.id)', 'max')
            .getRawOne();
        const newId = (maxIdUser.max || 0) + 1;
    
        return await this.userRepository.save({
            id: newId, 
            ...registerUserDto, 
            refresh_token: "NULL", 
            password: hashPassword
        });
    }
    

    async login(loginUserDto: LoginUserDto): Promise<any> {
        const user = await this.userRepository.findOne(
            {
                where: { email: loginUserDto.email }
            }
        );
        if (!user) {
            throw new HttpException("Login failed! Email or Password is not correct.", HttpStatus.UNAUTHORIZED);
        }

        console.log('User:', user);
        console.log('Entered Password:', loginUserDto.password);

        const checkPass = await bcrypt.compare(loginUserDto.password, user.password);
        if (!checkPass) {
            throw new HttpException('Login failed! Email or Password is not correct.', HttpStatus.UNAUTHORIZED);
        }

        // Generate token và refresh token
        const payload = { id: user.id, email: user.email };
        return this.generateToken(payload);
    }

    async refreshToken(refresh_token: string): Promise<any> {
        try {
            // Sử dụng secret key cứng (đảm bảo giá trị khớp khi tạo token)
            const secret = '123456';
    
            // Xác thực refresh_token
            const verify = await this.jwtService.verifyAsync(refresh_token, {
                secret: secret
            });
    
            console.log('Token Verified Successfully:', verify);
    
            // Tìm kiếm người dùng dựa trên email và refresh_token
            const checkExistToken = await this.userRepository.findOne({
                where: {
                    email: verify.email,
                    refresh_token: refresh_token
                }
            });
    
            console.log('Token Check Result:', checkExistToken);
    
            // Nếu token hợp lệ và tồn tại trong cơ sở dữ liệu, tạo và trả về token mới
            if (checkExistToken) {
                return this.generateToken({ id: verify.id, email: verify.email });
            } else {
                throw new HttpException('Refresh token is not valid', HttpStatus.BAD_REQUEST);
            }
        } catch (error) {
            // Log thông tin lỗi chi tiết
            console.error('Error in refreshToken:', error);
            throw new HttpException('Refresh token is not valid', HttpStatus.BAD_REQUEST);
        }
    }

    private async generateToken(payload: { id: number, email: string }) {
        const access_token = await this.jwtService.signAsync(payload);
        const refresh_token = await this.jwtService.signAsync(payload, {
            secret: '123456',
            expiresIn: '24h'
        });
        await this.userRepository.update(
            { email: payload.email },
            { refresh_token: refresh_token }
        );

        return { access_token, refresh_token };
    }


    async logout(email: string): Promise<void> {
    console.log('Processing logout for email:', email); // Kiểm tra giá trị email

    // Cập nhật cơ sở dữ liệu
    await this.userRepository.update(
        { email: email },
        { refresh_token: null }
    );
}


    private async hashPassword(password: string): Promise<string> {
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }

    
    
}
