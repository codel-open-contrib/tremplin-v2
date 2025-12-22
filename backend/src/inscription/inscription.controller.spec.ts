import { Test, TestingModule } from '@nestjs/testing';
import { InscriptionController } from './inscription.controller';
import { InscriptionService } from './inscription.service';

describe('InscriptionController', () => {
  let controller: InscriptionController;

  const mockInscriptionService = {
    obtenirListeInscription: jest.fn(),
    creerInscription: jest.fn(),
    obtenirInscriptionParIdInscription: jest.fn(),
    supprimerInscription: jest.fn(),
    modifierInscription: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InscriptionController],
      providers: [
        {
          provide: InscriptionService,
          useValue: mockInscriptionService,
        },
      ],
    }).compile();

    controller = module.get<InscriptionController>(InscriptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
