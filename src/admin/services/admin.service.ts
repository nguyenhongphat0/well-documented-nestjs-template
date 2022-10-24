import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { AdminRegisterDto } from '../dtos/admin.dto';
import { Admin } from '../entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminsRepository: Repository<Admin>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async validateAdmin(
    email: string,
    pass: string,
  ): Promise<Omit<Admin, 'password'>> {
    const user = await this.adminsRepository.findOneBy({ email });
    if (user) {
      const match = await compare(pass, user.password);
      if (match) {
        const { password, ...result } = user;
        return result;
      }
    }
    return undefined;
  }

  async login(user: Omit<Admin, 'password'>) {
    const payload = { username: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async create({ email, password, fullname }: AdminRegisterDto) {
    const hashedPassword = await hash(
      password,
      this.configService.get('password.saltOrRounds'),
    );
    return this.adminsRepository.save({
      email,
      fullname,
      isActive: true,
      password: hashedPassword,
    });
  }

  async remove(id: number): Promise<void> {
    await this.adminsRepository.delete(id);
  }
}
