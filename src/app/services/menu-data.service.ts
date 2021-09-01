import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomMenuItem } from '../modules/menu/models/menu-item.model';

@Injectable({
    providedIn: 'root',
})
/**
 * menu data service
 */
export class MenuDataService {

    public toggleMenuBar: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    getMenuList(): CustomMenuItem[] {
        return [
            {
                Label: 'Fechamento Bimestre', Icon: 'pi pi-list', RouterLink: 'bimestre', Childs: [], IsChildVisible: false
            },
            {
                Label: 'Lançamento de Notas', Icon: 'pi pi-book', RouterLink: 'notas', Childs: [], IsChildVisible: false
            },
            {
                Label: 'Boletim', Icon: 'pi pi-check-circle', RouterLink: 'boletim', Childs: [], IsChildVisible: false
            },
        ];
    }
}