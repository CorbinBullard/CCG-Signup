import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async getToken(@Headers('Authorization') authHeader: string) {
    console.log(authHeader);
    if (!authHeader) {
      throw new UnauthorizedException('Unauthorized');
    }
    const token: string = authHeader.split(' ')[1];
    return await this.authService.getToken(token);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.signIn(createAuthDto);
  }
}
