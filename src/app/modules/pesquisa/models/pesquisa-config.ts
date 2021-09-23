import { LocalNgModuleData } from '@angular/compiler-cli/src/ngtsc/scope';
import { ColunaConfig } from './coluna-config';

export interface PesquisaConfig {
    colunas: ColunaConfig[];
    pathApi: string;
    pagina: number;
    registros?: any[];
}
