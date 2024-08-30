import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppreciationController } from './appreciation.controller';
import { AppreciationService } from './appreciation.service';
import { Appreciation } from './entities/appreciation.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appreciation, User]),
  ],
  controllers: [AppreciationController],
  providers: [AppreciationService],
})
export class AppreciationModule {}
