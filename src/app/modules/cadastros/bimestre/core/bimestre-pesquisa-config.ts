import { PesquisaConfig } from 'src/app/modules/pesquisa/models/pesquisa-config';

export const PESQUISA_BIMESTRE_CONFIG: PesquisaConfig = {
    colunas: [
        {
            label: 'Código',
            nome: 'id'
        },
        {
            label: 'Bimestre',
            nome: 'desc_bimestre'
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
            nome: 'id_Alunos'
        },
        {
            label: 'Nome Aluno',
            nome: 'nm_Alunos'
        }
    ],
    pagina: 0,
    pathApi: 'bimestre'
};
