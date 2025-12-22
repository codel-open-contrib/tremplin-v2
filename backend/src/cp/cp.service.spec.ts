import { Test, TestingModule } from '@nestjs/testing';
import { CpService } from './cp.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cp } from './cp.entity';

describe('CpService', () => {
  let service: CpService;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CpService,
        {
          provide: getRepositoryToken(Cp),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CpService>(CpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
