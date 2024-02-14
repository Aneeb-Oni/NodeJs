import {
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import {FindOptionsWhere} from "typeorm/find-options/FindOptionsWhere";

@Injectable()
export class UsersRepository {
  constructor(@InjectRepository(User) private userModel: Repository<User>) {}

  //update user
  async updateUser(
    id: string,
    name: string,
    email: string,
  ): Promise<User | null> {
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) {
      return null;
    }

    user.name = name;
    user.email = email;
    return this.userModel.save(user);
  }

  //update user
  async setUserActive(id: string): Promise<User | null> {
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) {
      return null;
    }

    user.isActive = true;
    user.activatedAt = new Date();
    return this.userModel.save(user);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User | null> {
    return this.userModel.save(createUserDto);
  }

  async findUserByName(name: string): Promise<User | null> {
    return this.userModel.findOne({ where: { name } });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userModel.findOne({ where: { id } });
  }

  async updatePassword(email: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    user.password = password;
    return this.userModel.save(user);
  }



  // get all users
  async getAllUser() {
    return this.userModel.find({ where: { roles: 'user' } });
  }

  async delete(
      whereCondition:
          | FindOptionsWhere<User>[]
          | FindOptionsWhere<User> = undefined,
  ): Promise<User | null> {
    const user = await this.userModel.findOne({ where: whereCondition });
    if (!user) {
      return null;
    }
    await this.userModel.remove(user);
    return user;
  }
}
