import { PesquisaConfig } from 'src/app/modules/pesquisa/models/pesquisa-config';

export const PESQUISA_NOTAS_CONFIG: PesquisaConfig = {
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
            label: 'Aluno',
            nome: 'desalunos'
        },
        {
            label: 'Avaliação',
            nome: 'desavaliacao'
        },
        {
            label: 'Nota',
            nome: 'notas'
        }
    ],
    pathApi: 'notas'
};
