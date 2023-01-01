import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDtoCreate, UserDtoLogin } from '../dto/user.dto';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username) {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async register(userDto: UserDtoCreate) {
    const user = await this.userService.create(userDto);
    const token = this._createToken(user);
    return {
      username: user.username,
      role: user.role,
      ...token,
    };
  }

  async login(userLogin: UserDtoLogin) {
    const user = await this.userService.findByLogin(userLogin);
    const token = this._createToken(user);
    return {
      username: user.username,
      role: user.role,
      ...token,
    };
  }

  private _createToken({ username, role }) {
    const jwt = this.jwtService.sign({ username, role });
    return {
      jwt,
      expiresIn: process.env.EXPIRESIN,
    };
  }
}
