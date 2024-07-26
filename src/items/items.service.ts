import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Item } from './item.model';
import { ItemStatus } from './item-status.enum';
import { CreateItemDto } from './dto/create-item.dto';
import { v4 as uuid } from 'uuid';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ItemsService {
  private items: Item[] = [];
  findAll(): Item[] {
    return this.items;
  }

  findById(id: string): Item {
    const found = this.items.find((item) => item.id === id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  create(createItemDto: CreateItemDto, user: User): Item {
    const item: Item = {
      id: uuid(),
      ...createItemDto,
      status: ItemStatus.ON_SALE,
    };
    return item;
  }

  updateStatus(id: string, user: User): Item {
    // const item = await this.findById(id);
    // if (item.userId === user.id) {
    //   throw new BadRequestException('自身の商品を購入することはできません');
    // }
    item.status = ItemStatus.SOLD_OUT;
    return item;
  }

  async delete(id: string, user: User): Promise<void> {
    // const item = await this.findById(id);
    // if (item.userId !== user.id) {
    //   throw new BadRequestException('他人の商品は削除できません');
    // }
    this.items = this.items.filter((item) => item.id !== id);
  }
}
