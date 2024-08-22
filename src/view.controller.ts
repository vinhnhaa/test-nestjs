import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

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

  @Get('/dashboard')
  getDashboardPage(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', 'public', 'view', 'index.html'));
  }
  
}
