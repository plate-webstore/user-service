import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../shared/entities/user.entity';
import {UpdateUserDto} from "../shared/dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll() {
    return await this.userModel.find().exec();
  }

  async delete(id: string) {
    return await this.userModel.findByIdAndDelete(id).exec();
  }

  async findOneById(id: string) {
    const existingUser = await this.userModel.findById(id).exec();
    if (!existingUser) {
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return existingUser;
  }

  async deleteAll() {
    return await this.userModel.deleteMany({}).exec();
  }

  async findOneByEmail(email: string) {
    const existingUser = this.userModel.findOne({ email }).exec();
    if (!existingUser) {
      throw new HttpException(
        `User with email ${email} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return existingUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userModel
      .findByIdAndUpdate(
        id,
        { $set: { updateUserDto } },
        { new: true, useFindAndModify: false },
      )
      .exec();

    if (!existingUser) {
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return existingUser;
  }
}
