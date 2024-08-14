import { CreateOpcaoDto } from "src/opcoes/dto/create-opcao.dto";

export class CreateVarianteDto {
    vrnt_fotos:     string;
    vrnt_preco:     number
    vrnt_opcoes?:   CreateOpcaoDto[];
    prodt_id?:      number;
    tp_prec_id:     number;
}
