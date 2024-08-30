import { Body, Controller, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { AppreciationService } from './appreciation.service';
import { CreateAppreciationDto } from './dto/create-appreciation.dto';
import { Appreciation } from './entities/appreciation.entity';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Appreciation')
@Controller('appreciation')
export class AppreciationController {
  constructor(private readonly appreciationService: AppreciationService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createAppreciationDto: CreateAppreciationDto,
    @Request() req,
  ): Promise<Appreciation> {
    const userId = req['user_data'].id;
    return this.appreciationService.create(createAppreciationDto, userId);
  }

  @UseGuards(AuthGuard)
  @Put('appreciationUpdate')
  async update(
    @Body() updateAppreciationDto: Partial<CreateAppreciationDto>,
    @Request() req,
  ): Promise<any> {
    const userId = req['user_data'].id;
    return this.appreciationService.update(userId, updateAppreciationDto);
  }

  
}