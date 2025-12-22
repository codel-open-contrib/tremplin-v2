import { Test, TestingModule } from '@nestjs/testing';
import { AbonnementController } from './abonnement.controller';
import { AbonnementService } from './abonnement.service';

describe('AbonnementController', () => {
  let controller: AbonnementController;

  const mockAbonnementService = {
    obtenirListeAbonnement: jest.fn(),
    creerAbonnement: jest.fn(),
    obtenirAbonnementParRef: jest.fn(),
    supprimerAbonnement: jest.fn(),
    modifierAbonnement: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbonnementController],
      providers: [
        {
          provide: AbonnementService,
          useValue: mockAbonnementService,
        },
      ],
    }).compile();

    controller = module.get<AbonnementController>(AbonnementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
