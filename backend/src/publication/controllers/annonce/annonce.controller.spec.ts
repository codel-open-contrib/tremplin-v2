import { Test, TestingModule } from '@nestjs/testing';
import { AnnonceController } from './annonce.controller';
import { AnnonceService } from '../../services/annonce/annonce.service';

describe('AnnonceController', () => {
  let controller: AnnonceController;

  const mockAnnonceService = {
    creerAnnonce: jest.fn(),
    obtenirListeAnnonce: jest.fn(),
    obtenirAnnonceParRef: jest.fn(),
    supprimerAnnonce: jest.fn(),
    modifierAnnonce: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnnonceController],
      providers: [
        {
          provide: AnnonceService,
          useValue: mockAnnonceService,
        },
      ],
    }).compile();

    controller = module.get<AnnonceController>(AnnonceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
