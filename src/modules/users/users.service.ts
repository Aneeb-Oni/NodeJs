import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './schema/user.schema';
import { UserDataDto } from './dto/user-data.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) {}


  // update user
  async setUserActive(id: string) {
    return this.usersRepository.setUserActive(id);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findUserByEmail(email);
  }

  async getAllUserDataByUserId(id: any): Promise<UserDataDto | null> {
    const user = await this.usersRepository.findUserById(id);
    if (!user) {
      throw new ForbiddenException();
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles,
    };
  }

  async createUser(user: {
    password: string;
    readonly roles: string;
    readonly name: string;
    readonly email: string;
  }): Promise<User | null> {
    return this.usersRepository.createUser(user);
  }

  // get all users
  async getAllUser(): Promise<User[]> {
    const users = await this.usersRepository.getAllUser();
    if (!users) {
      throw new NotFoundException('No user exist');
    }
    return users;
  }

  // update user
  async updateUser(id: string, name: string, email: string) {
    return this.usersRepository.updateUser(id, name, email);
  }

  //delete user
  async deleteUser(id: string): Promise<User | null> {
    return this.usersRepository.deleteUser(id);
  }
}
