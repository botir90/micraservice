import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from './user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(name: string, email: string, password: string) {
    const exists = await this.userModel.findOne({ email });
    if (exists) throw new ConflictException('Email allaqachon mavjud');

    const hash = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({ name, email, password: hash });
    const token = this.jwtService.sign({ id: user._id, email });
    return { token, user: { id: user._id, name, email } };
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Email yoki parol xato');

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new UnauthorizedException('Email yoki parol xato');

    const token = this.jwtService.sign({ id: user._id, email });
    return { token, user: { id: user._id, name: user.name, email } };
  }
}