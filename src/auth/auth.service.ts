import { Injectable } from '@nestjs/common';
import { LojistasService } from 'src/lojistas/lojistas.service';

@Injectable()
export class AuthService {

    constructor(private readonly lojistaService: LojistasService){}

    async validateLojista(login: string, password: string) {
        const lojista = await this.lojistaService.findByLogin(login);


        console.log(lojista)



    }
    


}
