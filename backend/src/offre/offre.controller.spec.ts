import { Test, TestingModule } from '@nestjs/testing';
import { OffreController } from './offre.controller';
import { OffreService } from './offre.service';

describe('OffreController', () => {
  let controller: OffreController;

  const mockOffreService = {
    obtenirListeOffre: jest.fn(),
    creerOffre: jest.fn(),
    obtenirOffreParRef: jest.fn(),
    supprimerOffre: jest.fn(),
    modifierOffre: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OffreController],
      providers: [
        {
          provide: OffreService,
          useValue: mockOffreService,
        },
      ],
    }).compile();

    controller = module.get<OffreController>(OffreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
