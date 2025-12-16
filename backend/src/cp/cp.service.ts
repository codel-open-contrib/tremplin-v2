import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cp } from './cp.entity';

@Injectable()
export class CpService {
  constructor(
    @InjectRepository(Cp)
    private cpRepository: Repository<Cp>,
  ) {}

  async findAll(): Promise<Cp[]> {
    return this.cpRepository.find();
  }

  async findOne(id: number): Promise<Cp> {
    return this.cpRepository.findOneBy({ id });
  }

  async create(createCpDto: Partial<Cp>): Promise<Cp> {
    const cp = this.cpRepository.create(createCpDto);
    return this.cpRepository.save(cp);
  }

  async update(id: number, updateCpDto: Partial<Cp>): Promise<Cp> {
    await this.cpRepository.update(id, updateCpDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.cpRepository.delete(id);
  }
}
