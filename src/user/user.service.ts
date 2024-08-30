import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import  * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository:Repository<User>){}
    async findAll():Promise<User[]>{
        return await this.userRepository.find({
            select:['id','first_name','last_name','email','created_at','update_at']
        })
           
    }

    async findOne(id:number):Promise<User>{
        return await this.userRepository.findOneBy({id});
    }
    
    async getProfile(userId: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        return user;
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        // Lấy ID lớn nhất hiện có
        const maxUser = await this.userRepository.createQueryBuilder('user')
            .select('MAX(user.id)', 'max')
            .getRawOne();

        // Nếu tìm được maxID thì sử dụng maxID + 1, ngược lại sử dụng 1 (nếu chưa có user nào)
        const nextId = maxUser.max ? Number(maxUser.max) + 1 : 1;

        // Băm mật khẩu
        const hashPassword = await bcrypt.hash(createUserDto.password, 10);

        // Tạo user mới
        const newUser = this.userRepository.create({
            ...createUserDto,
            id: nextId, // Gán ID mới
            password: hashPassword,
        });

        return await this.userRepository.save(newUser);
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return await this.userRepository.update(id, updateUserDto);
    }

    async delete(id:number):Promise<DeleteResult>{
        return await this.userRepository.delete(id);
    }
}
