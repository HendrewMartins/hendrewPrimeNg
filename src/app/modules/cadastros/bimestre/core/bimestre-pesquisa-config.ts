import { PesquisaConfig } from 'src/app/modules/pesquisa/models/pesquisa-config';

export const PESQUISA_BIMESTRE_CONFIG: PesquisaConfig = {
    colunas: [
        {
            label: 'Código',
            nome: 'id'
        },
        {
            label: 'Bimestre',
            nome: 'desbimestre'
        },
        {
            label: 'Ano',
            nome: 'ano'
        },
        {
            label: 'Faltas',
            nome: 'faltas'
        },
        {
            label: 'Aluno',
            nome: 'idAlunos'
        },
        {
            label: 'Nome Aluno',
            nome: 'nmAlunos'
        }
    ],
    pathApi: 'bimestre'
};
