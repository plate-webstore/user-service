import { ApiProperty } from '@nestjs/swagger';

export class SignInUserDto {
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
}
