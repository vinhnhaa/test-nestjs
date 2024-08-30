import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from 'db/data-source';
import { ViewController } from './view.controller';
import { AuthGuard } from './auth/auth.guard';
import { AppreciationModule } from './appreciation/appreciation.module';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    AuthModule,
    AppreciationModule,
  ],
  controllers: [ViewController, AppController],
  providers: [AppService, AuthGuard],
})
export class AppModule {}
