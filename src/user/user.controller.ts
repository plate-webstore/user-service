import { Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
@ApiTags('User controller')
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @ApiOperation({ summary: 'Get user by email' })
  @Get('email/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

  @ApiOperation({ summary: 'Delete all users' })
  @Delete('delete-all')
  deleteAll() {
    return this.userService.deleteAll();
  }

  @ApiOperation({ summary: 'Delete user' })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @ApiOperation({ summary: 'Update user' })
  @Put(':id')
  update(@Param('id') id: string) {
    return this.userService.update(id);
  }
}
