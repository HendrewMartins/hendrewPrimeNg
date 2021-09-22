import { PesquisaConfig } from 'src/app/modules/pesquisa/models/pesquisa-config';

export const PESQUISA_ALUNO_ENDERECO_CONFIG: PesquisaConfig = {
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
            label: 'Logradouro',
            nome: 'logradouro'
        },

        {
            label: 'Num',
            nome: 'numero'
        },

        {
            label: 'Bairro',
            nome: 'bairro'
        },

        {
            label: 'CEP',
            nome: 'cep'
        },

        {
            label: 'Complemento',
            nome: 'complemento'
        },

    ],
    pathApi: 'enderecoaluno'
};

