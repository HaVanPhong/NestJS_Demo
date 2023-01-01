import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../dao/user.dao';
import {
  UserDto,
  UserDtoCreate,
  UserDtoLogin,
  UserDtoUpdate,
  UserDtoUpdatePassword,
} from '../dto/user.dto';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { ResusltReponse } from 'src/common/response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<UserDto[]> {
    const users = await this.userRepository.find();
    return plainToInstance(UserDto, users, { excludeExtraneousValues: true });
  }

  async create(userDto: UserDtoCreate): Promise<UserDto> {
    let oldUser = await this.userRepository.findOne({
      where: {
        username: userDto.username,
      },
    });

    if (oldUser) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }

    userDto.password = await bcrypt.hash(
      userDto.password,
      +process.env.SALT_ROUND,
    );
    const newUser = await this.userRepository.save(userDto);
    return plainToInstance(UserDto, newUser, { excludeExtraneousValues: true });
  }

  async update(
    id: string,
    userDtoUPdate: UserDtoUpdate,
  ): Promise<ResusltReponse> {
    const resultUpdatedUser = await this.userRepository.update(
      id,
      userDtoUPdate,
    );

    if (!resultUpdatedUser.affected) {
      throw new HttpException('Cannot update user', HttpStatus.BAD_REQUEST);
    }
    return new ResusltReponse('Update user success', HttpStatus.OK);
  }

  async updatePassword(id: string, userDto: UserDtoUpdatePassword) {
    userDto.password = await bcrypt.hash(
      userDto.password,
      +process.env.SALT_ROUND,
    );
    const resultUpdate = await this.userRepository.update(id, userDto);
    if (!resultUpdate.affected) {
      throw new HttpException('Cannot update password', HttpStatus.BAD_REQUEST);
    }
    return new ResusltReponse('Update password success', HttpStatus.OK);
  }

  async delete(id: string) {
    const result = await this.userRepository.delete(id);
    return result;
  }

  async getUserById(id: string): Promise<UserDto> {
    let user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
    }
    return plainToInstance(UserDto, user, { excludeExtraneousValues: true });
  }

  async findByLogin(userLogin: UserDtoLogin) {
    const user = await this.userRepository.findOne({
      where: {
        username: userLogin.username,
      },
    });
    if (!user) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const is_equal = bcrypt.compareSync(userLogin.password, user.password);
    if (!is_equal) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }

  async findByUsername(username) {
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
    if (!user) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
