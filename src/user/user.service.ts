import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

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
}
