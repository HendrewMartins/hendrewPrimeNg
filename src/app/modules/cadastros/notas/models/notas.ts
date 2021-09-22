import { Alunos } from "./alunos";
import { Avaliacao } from "./avaliacao";
import { Bimestre } from "./bimestre";

export interface Notas {
    id_Avaliacao?: number;
    nota?: number;
    id_Bimestre?: number;
    id_Aluno?: Alunos;
}