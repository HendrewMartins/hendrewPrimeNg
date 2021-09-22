import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-boletim',
  templateUrl: './boletim.component.html',
  styleUrls: ['./boletim.component.css']
})
export class BoletimComponent implements OnInit {

  public carregar: boolean = true;
  private subscription!: Subscription;

  constructor(
    public route: ActivatedRoute,
    public router: Router) { }

  ngOnInit(): void {
    this.carregar= true;
    this.subscription = this.route.data.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      const dados = params;
      console.log(dados.pathApi);
      if (dados.pathApi === 'boletim') {

        this.router.navigate(['pesquisa'], { relativeTo: this.route.parent });

      } 
    });
  }

}
