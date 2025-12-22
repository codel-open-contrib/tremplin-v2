import { Test, TestingModule } from '@nestjs/testing';
import { AbonnementService } from './abonnement.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Abonnement } from './abonnement.entity';

describe('AbonnementService', () => {
  let service: AbonnementService;

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
        AbonnementService,
        {
          provide: getRepositoryToken(Abonnement),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AbonnementService>(AbonnementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
