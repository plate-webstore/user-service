import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email',
    example: 'example@example.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    description: 'Password',
    example: 'password',
    required: true,
  })
  password: string;

  @ApiProperty({
    description: 'Username',
    example: 'username',
    required: true,
  })
  username: string;
}
