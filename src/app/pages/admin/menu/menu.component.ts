import { Component, OnInit } from '@angular/core';
import { CustomMenuItem } from 'src/app/modules/menu/models/menu-item.model';
import { ApplicationStateService } from 'src/app/services/application-state.service';
import { MenuDataService } from 'src/app/services/menu-data.service';

import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-menu',
    templateUrl: 'menu.component.html',
    styleUrls: ['menu.component.css']
})
export class MenuComponent implements OnInit {

    items: CustomMenuItem[] | undefined;
    selectedItem: string | undefined;
    visible!: boolean;

   

    constructor(
        private primengConfig: PrimeNGConfig,
        private menuDataService: MenuDataService,
        private applicationStateService: ApplicationStateService,
    ) { }

    ngOnInit() { 
       

        this.primengConfig.ripple = true;
        this.items = this.menuDataService.getMenuList();

        let that = this;
        this.menuDataService.toggleMenuBar.subscribe(function (data: any) {
            if (data && data != null) {
                that.visible = !that.visible;
            }
        });

        if (this.applicationStateService.getIsMobileResolution()) {
            this.visible = false;
        } else {
            this.visible = true;
        }

        let activeMenu: any = true;
        if (activeMenu) {
            this.selectedItem = activeMenu;
        } else {
            this.selectedItem = "Home";
        }
    }

    ngOnDestroy() {
        this.menuDataService.toggleMenuBar.observers.forEach(function (element) { element.complete(); });
    }

    
}
