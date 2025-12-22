import { Test, TestingModule } from '@nestjs/testing';
import { CoursService } from './cours.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cours } from './cours.entity';

describe('CoursService', () => {
  let service: CoursService;

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
        CoursService,
        {
          provide: getRepositoryToken(Cours),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CoursService>(CoursService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
