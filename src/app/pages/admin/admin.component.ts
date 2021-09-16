import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ApplicationStateService } from 'src/app/services/application-state.service';
import { MenuDataService } from 'src/app/services/menu-data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  public visibleSidebar1: any;
  public isMenuVisible: boolean | undefined;


  constructor(private primengConfig: PrimeNGConfig,
    private menuDataService: MenuDataService,
    private applicationStateService: ApplicationStateService) {

  }


  ngOnInit(): void {

    this.primengConfig.ripple = true;
    var that = this;
    this.menuDataService.toggleMenuBar.subscribe(function (data: any) {
      if (data && data != null) {
        that.isMenuVisible = !that.isMenuVisible;
      }
    });

    if (this.applicationStateService.getIsMobileResolution()) {
      this.isMenuVisible = false;
    } else {
      this.isMenuVisible = true;
    }
    
  }


}
