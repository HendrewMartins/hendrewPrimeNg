import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-importar',
  templateUrl: './importar.component.html',
  styleUrls: ['./importar.component.css'],
  providers: [MessageService]
})
export class ImportarComponent<T> implements OnInit {

  public carregar: boolean = true;
  public pesquisaCar: boolean = true;
  public uploadedFiles: any[] = [];
  public url: string;
  public validProgress: boolean = false;


  constructor(private messageService: MessageService,
    public http: HttpClient) {
    this.url = environment.api + '/api/alunos';
  }


  ngOnInit(): void {
    this.timeCarregar();
  }

  public timeCarregar() {
    setTimeout(() => {
      this.carregar = false;
    }, 1500);
  }

  public onUpload(event: any) {
    console.log('carregou');
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Arquivo Carregado' });
  }

  public onFileUpload(files: any): void {
    this.validProgress = true;
    console.log(files.files[0]);
    const formData: FormData = new FormData();
    const file = files.files[0];

    console.log(file);
    console.log(file.name);
    formData.append('file', file, file.name);
    console.log(formData);

    this.criarImport(formData).subscribe((registro) => {
      // FIXME: Realizar ação após gravar o registro
      this.validProgress = false;
      alert(`O registro foi importado com sucesso!`);

    }, error => {
      console.error(error);
      this.validProgress = false;
      alert('Ocorreu um erro ao importar o registro');
    });
    

  }

  public myUploader(event: any) {
    const formData: FormData = new FormData();
    formData.append('file', event, event.name);
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    console.log(formData);
    this.criarImport(this.uploadedFiles).subscribe((registro) => {
      // FIXME: Realizar ação após gravar o registro
      alert(`O registro foi importado com sucesso!`);

    }, error => {
      console.error(error);
      alert('Ocorreu um erro ao importar o registro');
    });
  }



  public criarImport(obj: any): Observable<T[]> {
    return this.http.post<any>(this.url + '/importar', obj).pipe(map((item: any[]) => {
      console.log(item);
      return item;
    }));
  }
}
