import { PesquisaConfig } from 'src/app/modules/pesquisa/models/pesquisa-config';

export const PESQUISA_ALUNO_CONFIG: PesquisaConfig = {
    colunas: [
        {
            label: 'Código',
            nome: 'id'
        },
        {
            label: 'Nome',
            nome: 'nome'
        },

        {
            label: 'Data Nascimento',
            nome: 'dt_nasc'
        },

        {
            label: 'Mãe',
            nome: 'nm_mae'
        },

        {
            label: 'CPF',
            nome: 'cpf'
        }        
    ],
    pagina: 0,
    pathApi: 'alunos'
};
