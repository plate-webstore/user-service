import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../shared/entities/user.entity';
import { CreateUserDto } from '../shared/dto/create-user.dto';
import { SignInUserDto } from '../shared/dto/sign-in-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, password, username } = createUserDto;

    const existingUserByEmail = await this.userModel.findOne({ email }).exec();
    if (existingUserByEmail) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const encryptedPassword = password; // TODO: encrypt password

    const newUser = new this.userModel({
      email: email,
      password: encryptedPassword,
      username: username,
      recordIds: [],
      transactionIds: [],
      wishListId: '',
    });

    const savedUser = await newUser.save();
    return await this.signIn({ email, password });
  }

  async signIn(signInUserDto: SignInUserDto) {
    const { email, password } = signInUserDto;
    const existingUser = await this.userModel.findOne({ email }).exec();

    if (!existingUser || existingUser.password !== password) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const payload = { sub: existingUser.id, email: existingUser.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verify(token: string) {
    try {
      return await this.jwtService.verify(token);
    } catch (e) {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }
  }
}
