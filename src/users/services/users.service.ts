import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from '@auth/dtos/auth.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<User>> {
    const queryBuilder = this.usersRepository.createQueryBuilder('c');
    queryBuilder.select(['c.id', 'c.fullname', 'c.email', 'c.isActive']);
    return paginate<User>(queryBuilder, options);
  }

  async getProfile(id: number): Promise<Omit<User, 'password'>> {
    const { password, ...user } = await this.usersRepository.findOneBy({ id });
    return user;
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  async create({ email, password, fullname }: RegisterDto) {
    const hashedPassword = await bcrypt.hash(
      password,
      this.configService.get('password.saltOrRounds'),
    );
    return this.usersRepository.save({
      email,
      fullname,
      isActive: true,
      password: hashedPassword,
    });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
