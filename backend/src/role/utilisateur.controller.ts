import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { CreateUtilisateurDto, UpdateUtilisateurDto, LoginUtilisateurDto } from '../dtos/utilisateur.dto';
import { Utilisateur } from './utilisateur.entity';

@Controller('utilisateur')
export class UtilisateurController {
    constructor(private readonly utilisateurService: UtilisateurService) {};

    @Post()
    ajouterUtilisateur(@Body() utilisateurData: CreateUtilisateurDto): Promise<Utilisateur> {
        return this.utilisateurService.ajouterUtilisateur(utilisateurData);
    }

    @Get()
    obtenirListeUtilisateur(): Promise<Utilisateur[]> {
        return this.utilisateurService.obtenirListeUtilisateur();
    }

    @Get(':uid')
    obtenirUtilisateurParID(@Param('uid') uid: number): Promise<Utilisateur> {
        return this.utilisateurService.obtenirUtilisateurParID(uid);
    }

    @Delete(':uid')
    supprimerUtilisateur(@Param('uid') uid: number): Promise<string> {
        return this.utilisateurService.supprimerUtilisateur(uid);
    }

    @Put(':uid')
    modifierUtilisateur(@Param('uid') uid: number, @Body() utilisateurData: UpdateUtilisateurDto): Promise<Utilisateur> {
        return this.utilisateurService.modifierUtilisateur(uid, utilisateurData);
    }

    @Post('login')
    seConnecter(@Body() utilisateurData: LoginUtilisateurDto): Promise<object> {
        return this.utilisateurService.seConnecter(utilisateurData);
    }
    @Get('/check/:email')
    obtenirUtilisateurParEmail(@Param('email') email: string): Promise<boolean> {
        return this.utilisateurService.obtenirUtilisateurParEmail(email);
    }
}
