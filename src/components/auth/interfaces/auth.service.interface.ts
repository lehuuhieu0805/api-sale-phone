import { User } from './../../user/user.entity';
import { SignInDto } from './../dto/signIn.dto';
import { SignUpDto } from './../dto/signUp.dto';

export const AUTH_SERVICE = 'AUTH SERVICE';

export interface IAuthService {
  signUp(signUpDto: SignUpDto): Promise<User>;
  signIn(signInDto: SignInDto): Promise<{ access_token: string }>;
  validateUser(username: string, password: string): Promise<User | null>;
}
