import { PesquisaConfig } from 'src/app/modules/pesquisaboletim/models/pesquisa-config';

export const PESQUISA_BOLETIM_CONFIG: PesquisaConfig = {
    colunas: [
        {
            label: 'Aluno',
            nome: 'desaluno'
        },
        {
            label: 'Nota 1º',
            nome: 'nota1'
        },
        {
            label: 'Nota 2º',
            nome: 'nota2'
        },
        {
            label: 'Nota 3º',
            nome: 'nota3'
        },
        {
            label: 'Nota 4º',
            nome: 'nota4'
        },
        {
            label: 'Faltas',
            nome: 'faltas'
        },
        {
            label: 'Nota Final',
            nome: 'mediafinal'
        },
        {
            label: 'Situação',
            nome: 'situacao'
        },
    ],
    ano: '2021',
    pathApi: 'boletim',

};
