import { Test, TestingModule } from '@nestjs/testing';
import { UtilisateurController } from './utilisateur.controller';
import { UtilisateurService } from './utilisateur.service';

describe('UtilisateurController', () => {
  let controller: UtilisateurController;

  const mockUtilisateurService = {
    ajouterUtilisateur: jest.fn(),
    obtenirListeUtilisateur: jest.fn(),
    obtenirUtilisateurParID: jest.fn(),
    supprimerUtilisateur: jest.fn(),
    modifierUtilisateur: jest.fn(),
    seConnecter: jest.fn(),
    obtenirUtilisateurParEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UtilisateurController],
      providers: [
        {
          provide: UtilisateurService,
          useValue: mockUtilisateurService,
        },
      ],
    }).compile();

    controller = module.get<UtilisateurController>(UtilisateurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
