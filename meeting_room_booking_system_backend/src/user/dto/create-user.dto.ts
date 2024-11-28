import { IsNotEmpty, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  username: string;

  @IsNotEmpty({
    message: '密码不能为空',
  })
  @MinLength(6, {
    message: '密码长度不能小于6',
  })
  password: string;

  @IsNotEmpty({
    message: '昵称不能为空',
  })
  nickname: string;
  @IsNotEmpty({
    message: '邮箱不能为空',
  })
  email: string;

  @IsNotEmpty({
    message: '验证码不能为空',
  })
  captcha: string;
}
