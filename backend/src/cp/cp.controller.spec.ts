import { Test, TestingModule } from '@nestjs/testing';
import { CpController } from './cp.controller';
import { CpService } from './cp.service';

describe('CpController', () => {
  let controller: CpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CpController],
      providers: [CpService],
    }).compile();

    controller = module.get<CpController>(CpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
