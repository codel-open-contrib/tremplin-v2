import { Test, TestingModule } from '@nestjs/testing';
import { CatalogueService } from './catalogue.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Catalogue } from '../../entities/catalogue.entity';

describe('CatalogueService', () => {
  let service: CatalogueService;

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
        CatalogueService,
        {
          provide: getRepositoryToken(Catalogue),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CatalogueService>(CatalogueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
