import { Controller, Get, Body, Param, Delete, Put } from '@nestjs/common';
import { SignupService } from './signup.service';
import { UpdateSignupDto } from './dto/update-signup.dto';

@Controller('signups')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Get()
  findAll() {
    return this.signupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.signupService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSignupDto: UpdateSignupDto) {
    return this.signupService.update(+id, updateSignupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.signupService.remove(+id);
  }
}
