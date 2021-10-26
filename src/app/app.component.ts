import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'hendrewPrimeNg';

  constructor(private config: PrimeNGConfig) {}

    ngOnInit() {
        this.config.setTranslation({
          dayNames: [ "domingo","segunda","terça","quarta","quinta","sexta","sábado" ],
          dayNamesShort: [ "dom","seg","ter","qua","qui","sex","sáb" ],
          dayNamesMin: [ "D","S","T","Q","Q","S","S" ],
          monthNames: [ "Janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro" ],
          monthNamesShort: [ "jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez" ],
          today: 'Hoje',
          clear: 'Limpar',
          accept: 'Accept',
          reject: 'Cancel',
          emptyMessage: 'Nenhum resultado encontrado!',
          choose: 'Escolher',
          upload: 'Enviar',
          cancel: 'Cancelar'
            //Tradutor
        });
    }
}
