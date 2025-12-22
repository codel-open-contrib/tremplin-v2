import { Test, TestingModule } from '@nestjs/testing';
import { OffreService } from './offre.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Offre } from './offre.entity';

describe('OffreService', () => {
  let service: OffreService;

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
        OffreService,
        {
          provide: getRepositoryToken(Offre),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<OffreService>(OffreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
