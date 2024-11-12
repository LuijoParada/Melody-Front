import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { AlertComponent } from '../../misc/alert/alert.component';
import { CommonModule } from '@angular/common';
import { MusictopartitureAuxService } from '../../services/musictopartiture-aux.service'; 
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-musictopartiture',
  standalone: true,
  imports: [FormsModule, AlertComponent, CommonModule],
  templateUrl: './musictopartiture.component.html',
  styleUrls: ['./musictopartiture.component.css']
})
export class MusictopartitureComponent {

  @ViewChild('alertBottom', { static: true }) alertBottom!: ElementRef;
  isSent: boolean = false;
  isActive: boolean = true;
  fileName: string | null = null;
  file: File | null = null;
  disableButton = false; //cambiar el componente html para que funcione, es decir, agregar el [disabled]="disableButton" en el boton de enviar
  pdfUrl: SafeResourceUrl | null = null; // Tipo SafeResourceUrl para URLs seguras
  isLoading = false; // Variable de estado de carga

  constructor(private musictopartitureAuxService: MusictopartitureAuxService, private sanitizer: DomSanitizer) {}
  
    // Método para manejar el evento 'dragover' y prevenir el comportamiento predeterminado
    onDragOver(event: DragEvent) {
      event.preventDefault();
    }
  
    // Método para manejar el evento 'drop' y extraer el archivo
    onFileDrop(event: DragEvent) {
      event.preventDefault();
      if (event.dataTransfer?.files.length) {
        // Extraer el archivo del evento y guardarlo en la variable 'file'
        const file = event.dataTransfer.files[0];
        this.handleFile(file);
      }
    }
  
    // Método para manejar el cambio en el input file
    onFileChange(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) { // Verificar si hay archivos seleccionados
        const file = target.files[0];
        this.handleFile(file);
      }
    }
  
    // Método para manejar el archivo seleccionado
    handleFile(file: File) {
      console.log('Archivo cargado:', file);
      this.file = file;
      this.fileName = file.name;
      console.log('Nombre del archivo:', file.name);
      this.isActive = false;
      // Aquí puedes agregar la lógica adicional para manejar el archivo cargado.
    }

    mostrarAlerta(posicion: ElementRef) {
      this.musictopartitureAuxService.showAlertAt(posicion.nativeElement);
    }


  disableButtonFunction() {
    this.disableButton = true;

  }
  //fileDrop
  fileDrop(){
    this.isActive = !this.isActive;
    this.isSent =  !this.isSent;
  }

  // Enviar el archivo al servidor
  async onSubmit(event: Event) {

    this.isSent = true;
    this.mostrarAlerta(this.alertBottom);

    event.preventDefault();
    if (!this.file) {

      return alert('Por favor, seleccione un archivo');
    }
    try {
      // Crear un FormData y agregar el archivo
      const formData = new FormData();
      formData.append('audiofile', this.file);
      this.isLoading = true;
      console.log('Archivo enviado');
      // Realizar la solicitud POST a la API
      await axios.post('http://localhost:8000/api/audio/convert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      },
    ).then((response) => {
        //el servidor responde con el archivo que enviara como return response()->file(storage_path("app/temp/output/{$midiName}"));
        console.log('Respuesta del servidor:', response.data);
        // Obtener la URL del archivo PDF
        const pdfPath = response.data.pdfurl;
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfPath); // Marca la URL como segura
        console.log('URL del archivo:', pdfPath);
        this.isLoading = false;

      });
    } catch (error) {
      console.error('Error durante el envío del archivo', error);
    }

  }
}
