import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('View')
@Controller()
export class ViewController {
  @Get('/login')
  getLoginPage(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', 'public', 'view', 'login.html'));
  }

  @Get('/register')
  getRegisterPage(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', 'public', 'view', 'register.html'));
  }

  @Get('/index')
  getIndexPage(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', 'public', 'view', 'index.html'));
  }
  
  @Get(['/', '/home'])
  getHomePage(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', 'public', 'view', 'home.html'));
  }
}
