import { PesquisaConfig } from 'src/app/modules/pesquisaboletim/models/pesquisa-config';

export const PESQUISA_BOLETIM_CONFIG: PesquisaConfig = {
    colunas: [
        {
            label: 'Aluno',
            nome: 'desc_Aluno'
        },
        {
            label: 'Nota 1º',
            nome: 'nota_1'
        },
        {
            label: 'Nota 2º',
            nome: 'nota_2'
        },
        {
            label: 'Nota 3º',
            nome: 'nota_3'
        },
        {
            label: 'Nota 4º',
            nome: 'nota_4'
        },
        {
            label: 'Faltas',
            nome: 'faltas'
        },
        {
            label: 'Nota Final',
            nome: 'media_final'
        },
        {
            label: 'Situação',
            nome: 'situacao'
        },
    ],
    ano: '2021',
    pathApi: 'boletim',

};
