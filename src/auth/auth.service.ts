import { Injectable } from '@nestjs/common';
import { LojistasService } from 'src/lojistas/lojistas.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    

    constructor(private readonly lojistaService: LojistasService){}

    async validateLojista(login: string, password: string) {
        const lojista = await this.lojistaService.findByLogin(login);

        if(lojista){
            const isPasswordValid = await bcrypt.compare(password, lojista.lojst_senha_hash)
            if(isPasswordValid) {
                console.log("entrou")
                return {
                    ...lojista, 
                    password: undefined,
                };
            }
        }
        throw new Error('Login ou senha fornecido é incorreto.')
    }
    


}
