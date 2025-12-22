import { Test, TestingModule } from '@nestjs/testing';
import { CoursController } from './cours.controller';
import { CoursService } from './cours.service';

describe('CoursController', () => {
  let controller: CoursController;

  const mockCoursService = {
    obtenirListeCours: jest.fn(),
    creerCours: jest.fn(),
    obtenirCoursParCode: jest.fn(),
    supprimerCours: jest.fn(),
    modifierCours: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursController],
      providers: [
        {
          provide: CoursService,
          useValue: mockCoursService,
        },
      ],
    }).compile();

    controller = module.get<CoursController>(CoursController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
