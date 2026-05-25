import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll() {
    return this.productModel.find().sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException('Mahsulot topilmadi');
    return product;
  }

  async create(body: any) {
    return this.productModel.create(body);
  }

  async update(id: string, body: any) {
    const product = await this.productModel.findByIdAndUpdate(id, body, { new: true });
    if (!product) throw new NotFoundException('Mahsulot topilmadi');
    return product;
  }

  async remove(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) throw new NotFoundException('Mahsulot topilmadi');
    return { message: 'Mahsulot o\'chirildi' };
  }
}