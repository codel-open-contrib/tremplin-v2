import { Test, TestingModule } from '@nestjs/testing';
import { AnnonceService } from './annonce.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Annonce } from '../../entities/annonce.entity';

describe('AnnonceService', () => {
  let service: AnnonceService;

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
        AnnonceService,
        {
          provide: getRepositoryToken(Annonce),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AnnonceService>(AnnonceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
