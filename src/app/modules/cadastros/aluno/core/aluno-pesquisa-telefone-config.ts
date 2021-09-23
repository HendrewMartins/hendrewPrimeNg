import { PesquisaConfig } from 'src/app/modules/pesquisa/models/pesquisa-config';

export const PESQUISA_ALUNO_TELEFONE_CONFIG: PesquisaConfig = {
    colunas: [
        {
            label: 'Seq',
            nome: 'sequencia'
        },
        {
            label: 'Tipo',
            nome: 'tipo'
        },
        {
            label: 'Telefone',
            nome: 'numero'
        },

        {
            label: 'Contato',
            nome: 'contato'
        },

    ],
    pagina: 0,
    pathApi: 'telefonealuno'
};

