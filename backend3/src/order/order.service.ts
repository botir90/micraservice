import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Order } from './order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private httpService: HttpService,
  ) {}

  async findAll() {
    return this.orderModel.find().sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const order = await this.orderModel.findById(id);
    if (!order) throw new NotFoundException('Buyurtma topilmadi');
    return order;
  }

  async create(body: any) {
    const { userId, items } = body;
    const enrichedItems: any[] = [];
    let totalPrice = 0;

    for (const item of items) {
      const { data: product } = await firstValueFrom(
        this.httpService.get(`${process.env.PRODUCT_URL}/products/${item.productId}`)
      );
      const enrichedItem: any = {
        productId: item.productId,
        productName: product.name,
        price: product.price,
        quantity: item.quantity || 1,
      };
      enrichedItems.push(enrichedItem);
      totalPrice += product.price * (item.quantity || 1);
    }

    return this.orderModel.create({ userId, items: enrichedItems, totalPrice });
  }

  async updateStatus(id: string, status: string) {
    const order = await this.orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!order) throw new NotFoundException('Buyurtma topilmadi');
    return order;
  }

  async remove(id: string) {
    const order = await this.orderModel.findByIdAndDelete(id);
    if (!order) throw new NotFoundException('Buyurtma topilmadi');
    return { message: 'Buyurtma o\'chirildi' };
  }
}