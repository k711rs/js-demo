import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @Inject(DbService)
  dbService: DbService;

  async register(registerUserDto: RegisterUserDto) {
    const users: User[] = await this.dbService.read();
    const findUser = users.find(
      (item) => item.username === registerUserDto.username,
    );
    if (findUser) {
      return '用户已存在';
    }
    const user = new User();
    user.username = registerUserDto.username;
    user.password = registerUserDto.password;
    users.push(user);
    await this.dbService.write(users);
    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const users: User[] = await this.dbService.read();
    const findUser = users.find(
      (item) => item.username === loginUserDto.username,
    );
    if (!findUser) {
      throw new BadRequestException('用户名不存在');
    }
    if (findUser.password === loginUserDto.password) {
      return '登录成功';
    } else {
      throw new BadRequestException('密码错误');
    }
  }
}
