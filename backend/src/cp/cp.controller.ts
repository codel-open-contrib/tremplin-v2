import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CpService } from './cp.service';
import { Cp } from './cp.entity';

@Controller('cp')
export class CpController {
  constructor(private readonly cpService: CpService) {}

  @Post()
  create(@Body() Cp: Cp) {
    return this.cpService.create(Cp);
  }

  @Get()
  findAll() {
    return this.cpService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cpService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() Cp: Cp) {
    return this.cpService.update(+id, Cp);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cpService.remove(+id);
  }
}
