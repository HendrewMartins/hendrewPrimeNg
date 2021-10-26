import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-importar',
  templateUrl: './importar.component.html',
  styleUrls: ['./importar.component.css'],
  providers: [MessageService]
})
export class ImportarComponent implements OnInit {

  public carregar: boolean = true;
  public pesquisaCar: boolean = true;
  public uploadedFiles: any[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.timeCarregar();
  }

  public timeCarregar() {
    setTimeout(() => {
      this.carregar = false;
  }, 1500); 
  }

  public onUpload(event: any) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }
    
    this.messageService.add({severity: 'info', summary: 'Success', detail: 'Arquivo Carregado'});
}

}
