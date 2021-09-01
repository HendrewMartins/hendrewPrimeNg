import { Component, OnInit } from '@angular/core';
import { MenuDataService } from 'src/app/services/menu-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private menuDataService: MenuDataService) { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.menuDataService.toggleMenuBar.next(true);
  }

}
