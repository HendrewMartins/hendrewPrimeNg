import { AlunosEndereco } from "./alunosendereco";
import { AlunosTelefone } from "./alunostelefone";

export interface Alunos{
    nome?: string;
    dt_nasc?: Date;
    nm_mae?: string;
    matricula?: string;
    nm_pai?: string;
    rg_aluno?: string;
    cpf?: string;
    alunos_endereco?: AlunosEndereco[];
    alunos_telefone?: AlunosTelefone[];
}
