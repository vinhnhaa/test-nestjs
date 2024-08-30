import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appreciation } from './entities/appreciation.entity';
import { CreateAppreciationDto } from './dto/create-appreciation.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AppreciationService {
  constructor(
    @InjectRepository(Appreciation)
    private appreciationRepository: Repository<Appreciation>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createAppreciationDto: CreateAppreciationDto, userId: number): Promise<any> {
    const { quality, Feedback } = createAppreciationDto;

    // Check if the user has already given an appreciation
    const existingAppreciation = await this.appreciationRepository.findOne({
      where: { user: { id: userId } },
    });

    if (existingAppreciation) {
      throw new BadRequestException('User has already submitted an appreciation.');
    }

    // Ensure quality is between 1-5
    if (quality < 1 || quality > 5) {
      throw new BadRequestException('Quality must be between 1 and 5.');
    }

    // Lấy thông tin user từ userId
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('User not found.');
    }

    const newAppreciation = this.appreciationRepository.create({
      quality,
      Feedback,
      user,
    });

    await this.appreciationRepository.save(newAppreciation);

    // Trả về thông tin theo yêu cầu
    return {
      quality: newAppreciation.quality,
      Feedback: newAppreciation.Feedback,
      id: newAppreciation.id,
      created_at: newAppreciation.created_at,
      update_at: newAppreciation.update_at,
      user: {
        id: user.id,
        email: user.email
      }
    };
  }

  async update(userId: number, updateAppreciationDto: Partial<CreateAppreciationDto>): Promise<any> {
    const { quality, Feedback } = updateAppreciationDto;

    // Lấy sự đánh giá của người dùng hiện tại
    const appreciation = await this.appreciationRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!appreciation) {
      throw new BadRequestException('Appreciation not found.');
    }

    // Ensure quality is between 1-5
    if (quality && (quality < 1 || quality > 5)) {
      throw new BadRequestException('Quality must be between 1 and 5.');
    }

    appreciation.quality = quality ?? appreciation.quality;
    appreciation.Feedback = Feedback ?? appreciation.Feedback;

    const updatedAppreciation = await this.appreciationRepository.save(appreciation);

    return {
      quality: updatedAppreciation.quality,
      Feedback: updatedAppreciation.Feedback,
      id: updatedAppreciation.id,
      created_at: updatedAppreciation.created_at,
      update_at: updatedAppreciation.update_at,
      user: {
        id: userId, // Đưa id người dùng hiện tại vào
        email: (await this.userRepository.findOne({ where: { id: userId } })).email
      }
    };
  }

  
}