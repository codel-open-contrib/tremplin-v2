import { Test, TestingModule } from '@nestjs/testing';
import { UtilisateurService } from './utilisateur.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Utilisateur } from './utilisateur.entity';

describe('UtilisateurService', () => {
  let service: UtilisateurService;

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
        UtilisateurService,
        {
          provide: getRepositoryToken(Utilisateur),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UtilisateurService>(UtilisateurService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
