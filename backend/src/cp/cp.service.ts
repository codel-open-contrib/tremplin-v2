import { Injectable } from '@nestjs/common';
import { Cp } from './cp.entity';

@Injectable()
export class CpService {
  create(createCpDto: Cp) {
    return 'This action adds a new cp';
  }

  findAll() {
    return `This action returns all cp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cp`;
  }

  update(id: number, Cp: Cp) {
    return `This action updates a #${id} cp`;
  }

  remove(id: number) {
    return `This action removes a #${id} cp`;
  }
}
