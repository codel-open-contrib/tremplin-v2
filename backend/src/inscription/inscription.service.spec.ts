import { Test, TestingModule } from '@nestjs/testing';
import { InscriptionService } from './inscription.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Inscription } from './inscription.entity';

describe('InscriptionService', () => {
  let service: InscriptionService;

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
        InscriptionService,
        {
          provide: getRepositoryToken(Inscription),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<InscriptionService>(InscriptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
