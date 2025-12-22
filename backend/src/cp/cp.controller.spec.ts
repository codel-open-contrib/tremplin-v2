import { Test, TestingModule } from '@nestjs/testing';
import { CpController } from './cp.controller';
import { CpService } from './cp.service';

describe('CpController', () => {
  let controller: CpController;

  const mockCpService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CpController],
      providers: [
        {
          provide: CpService,
          useValue: mockCpService,
        },
      ],
    }).compile();

    controller = module.get<CpController>(CpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
