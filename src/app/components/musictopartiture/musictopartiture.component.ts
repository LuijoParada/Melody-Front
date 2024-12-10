import { Component, ViewChild, ElementRef, AfterViewInit, SecurityContext } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { AlertComponent } from '../../misc/alert/alert.component';
import { CommonModule } from '@angular/common';
import { MusictopartitureAuxService } from '../../services/musictopartiture-aux.service'; 
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';
import { AuthService } from '../../services/auth.service';

import { SharedStateService } from '../../services/shared-state.service';
@Component({
  selector: 'app-musictopartiture',
  standalone: true,
  imports: [FormsModule, AlertComponent, CommonModule],
  templateUrl: './musictopartiture.component.html',
  styleUrls: ['./musictopartiture.component.css']
})
export class MusictopartitureComponent implements AfterViewInit {

  @ViewChild('alertBottom', { static: true }) alertBottom!: ElementRef;
  @ViewChild('modalElement', { static: true }) modalElementRef!: ElementRef; // modalElementRef es el nombre de la variable que se le asigna al elemento modalElement
  @ViewChild('audioPlayer', { static: true }) audioPlayerRef!: ElementRef;

  isSent = false; //ebe ser false
  isActive = true;
  fileName: string | null = null;
  file: File | null = null;
  disableButton = false;
  pdfUrl: SafeResourceUrl | null = null;
  isLoading = false; //debe ser false
  modal!: ModalInterface; //modal
  audiofileURL: string | null = null;
  audioname: string | null = null;
  filesSaved = false;
  favs = false;
  userId: string | null = null;

  constructor(private musictopartitureAuxService: MusictopartitureAuxService, private sanitizer: DomSanitizer, private auth: AuthService, private sharedState: SharedStateService) {
    this.userId = auth.getUser()?.id;
  }

    

    ngAfterViewInit() {
    // Configuración del modal
    const modalOptions: ModalOptions = {
      placement: 'bottom-right',
      backdrop: 'dynamic',
      backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
      closable: true,
      onHide: () => console.log('modal is hidden'),
      onShow: () => console.log('modal is shown'),
      onToggle: () => console.log('modal has been toggled'),
    };
    this.modal = new Modal(this.modalElementRef.nativeElement, modalOptions);
    }
    openModal() {
      this.modal.show();
    }
    closeModal() {
      this.modal.hide();
    }


    onDragOver(event: DragEvent) {
      event.preventDefault();
    }
    onFileDrop(event: DragEvent) {
      event.preventDefault();
      if (event.dataTransfer?.files.length) {
        const file = event.dataTransfer.files[0];
        this.handleFile(file);
      }
    }
    onFileChange(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        this.audiofileURL = URL.createObjectURL(file);
        this.handleFile(file);
      }
    }

    handleFile(file: File) {
      console.log('Archivo cargado:', file);
      this.file = file;
      this.fileName = file.name;
      console.log('Nombre del archivo:', file.name);
      this.isActive = false;
    }

    mostrarAlerta(posicion: ElementRef) {
      this.musictopartitureAuxService.showAlertAt(posicion.nativeElement);
    }
    eliminarAlerta(posicion: ElementRef) {
      this.musictopartitureAuxService.deleteAlert(posicion.nativeElement);
    } 
    disableButtonFunction() {
      this.disableButton = true;
    }
    fileDrop() { //funcion que quita el archivo seleccionado

      this.file = null;
      this.isLoading = !this.isLoading;
      this.isActive = !this.isActive; 
      this.favs = false; 
      this.pdfUrl = null;
      
      if(this.isSent === true) {
        this.isSent = !this.isSent;
        
        this.eliminarAlerta(this.alertBottom);
        this.disableButton = !this.disableButton;
      }
    }

  async onSubmit(event: Event) {
    event.preventDefault();
    if (!this.file) {
      return this.modal.show();
    }

    this.isSent = true;
    this.mostrarAlerta(this.alertBottom);
    this.isLoading = true;

    try {
      const formData = new FormData();
      formData.append('audiofile', this.file);
      console.log('Archivo enviado');

      const response = await axios.post('http://localhost:8000/api/audio/convert', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
        console.log('Respuesta del servidor:', response.data);
        const pdfPath = response.data.pdfurl;
        console.log('URL del archivo:', pdfPath);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfPath);
        console.log('URL del archivo:', this.pdfUrl);
        this.audioname = response.data.audioname;
        //console.log('URL del archivo:', pdfPath);
    } catch (error) {
      console.error('Error durante el envío del archivo', error);
    } finally {
      this.isLoading = false;
    }
  }
  //funcion para guardar el audio y la partitura en favoritos del usuario
  handleClick(): void {
    if (!this.auth.isLoggedIn()) {
      alert('Debes estar registrado para realizar esta acción.');
      // Lógica adicional para usuarios autenticados
    } else {
      this.saveToFavorites()
    }
  }
  async saveToFavorites() {
    if (!this.audioname || !this.pdfUrl) {
      console.error('Faltan el nombre del archivo de audio o la URL del PDF para guardar en favoritos.');
      return;
    }
  
    // Extraer el nombre del archivo PDF desde la URL
    const pdfName = this.sanitizer.sanitize(SecurityContext.URL, this.pdfUrl)?.split('/').pop();
    if (!pdfName) {
      console.error('No se pudo extraer el nombre del archivo PDF desde la URL proporcionada.');
      return;
    }
  
    this.filesSaved = true;
  
    try {
      const response = await axios.post(
        'http://localhost:8000/api/audio/favorite',
        {
          audio_name: this.audioname, // Nombre del archivo de audio
          pdf_name: pdfName, // Nombre del archivo PDF extraído
          id_usuario: this.userId, // ID del usuario (asegúrate de obtenerlo en tu componente)
          
        },
        {
          withCredentials: true, // Incluir credenciales si es necesario
        }
      );

      //this.sharedState.incrementUserCount(); // Incrementar el contador global

      console.log('Guardado en favoritos con éxito:', response.data);
      alert('Guardado en favoritos con éxito'); // Alerta emergente estándar
    } catch (error) {
      console.error('Error al guardar en favoritos:', error);
      alert('Error al guardar en favoritos. Por favor, intenta nuevamente.');
    } finally {
      this.filesSaved = false;
      this.favs = !this.favs; // Alternar estado de favoritos
    }
  }
  

}
