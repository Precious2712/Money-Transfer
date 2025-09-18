import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { CreateAuthDto } from './dto/create-auth-dto';
import { Singnup } from './schema/auth.schema';
import { JwtPayload } from './jwt-payload.interface';
import { UpdateAuthDto } from './dto/update-auth-dto';

export interface LoginResponse {
  message: string;
  accessToken: string;
  id: string;
  email: string;
  country?: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Singnup.name) private signupModel: Model<Singnup>,
    private jwtService: JwtService,
  ) {}

  async signupUser(createAuth: CreateAuthDto) {
    try {
      const { email, password, country } = createAuth;

      if (!email && !password && !country) {
        return { message: 'Email country and password are empty' };
      }
      if (!email) {
        return { message: 'Email field is empty' };
      }
      if (!password) {
        return { message: 'Password field is empty' };
      }
      if (!country) {
        return { message: 'Country field is empty' };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = new this.signupModel({
        ...createAuth,
        password: hashedPassword,
      });

      const user = await createdUser.save();

      // const payload: JwtPayload = {
      //   sub: user._id.toString(),
      //   email: user.email,
      // };

      // const accessToken = this.jwtService.sign(payload);

      const { password: _, ...userWithoutPassword } = user.toObject();

      return {
        message: 'User registered successfully',
        user: userWithoutPassword,
        // accessToken
      };
    } catch (error) {
      if (error.code === 11000) {
        return { message: 'Email already exists' };
      }

      console.error('Signup error:', error);
      return { message: 'Something went wrong during signup' };
    }
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.signupModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      sub: user._id.toString(),
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      accessToken,
      id: user._id.toString(),
      email: user.email,
      country: user.country,
    };
  }

  async getAllUser() {
    const allUser = await this.signupModel.find().exec();
    return {
      message: 'All users in database',
      allUser
    }
  }

  async userId(id: string) {
    const user = await this.signupModel.findById(id).exec();
    if (!user) {
      return { message: 'User not found in database' }
    }

    return {
      message: 'User found',
      user
    }
  }

  async updateUserData(id: string, updateAuthDto: UpdateAuthDto) {
    const updateData: Partial<UpdateAuthDto> = {};

    if (updateAuthDto.password) {
      updateData.password = await bcrypt.hash(updateAuthDto.password, 10);
    }

    if (updateAuthDto.country) {
      updateData.country = updateAuthDto.country;
    }

    const updatedUser = await this.signupModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return {
      message: 'User updated successfully',
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        country: updatedUser.country,
      },
    };
  }
}