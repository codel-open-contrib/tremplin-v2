import { Test, TestingModule } from '@nestjs/testing';
import { CatalogueController } from './catalogue.controller';
import { CatalogueService } from '../../services/catalogue/catalogue.service';

describe('CatalogueController', () => {
  let controller: CatalogueController;

  const mockCatalogueService = {
    creerCatalogue: jest.fn(),
    obtenirListeCatalogue: jest.fn(),
    obtenirCatalogueParRef: jest.fn(),
    supprimerCatalogue: jest.fn(),
    modifierCatalogue: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatalogueController],
      providers: [
        {
          provide: CatalogueService,
          useValue: mockCatalogueService,
        },
      ],
    }).compile();

    controller = module.get<CatalogueController>(CatalogueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
