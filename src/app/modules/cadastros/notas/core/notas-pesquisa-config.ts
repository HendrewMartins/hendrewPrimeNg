import { PesquisaConfig } from 'src/app/modules/pesquisa/models/pesquisa-config';

export const PESQUISA_NOTAS_CONFIG: PesquisaConfig = {
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
            label: 'Aluno',
            nome: 'desc_Aluno'
        },
        {
            label: 'Avaliação',
            nome: 'desc_avaliacao'
        },
        {
            label: 'Nota',
            nome: 'notas'
        }
    ],
    pathApi: 'nota'
};
