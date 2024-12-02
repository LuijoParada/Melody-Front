import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { AlertComponent } from '../../misc/alert/alert.component';
import { CommonModule } from '@angular/common';
import { MusictopartitureAuxService } from '../../services/musictopartiture-aux.service'; 
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';

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

  constructor(private musictopartitureAuxService: MusictopartitureAuxService, private sanitizer: DomSanitizer) {}

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
        //console.log('Respuesta del servidor:', response.data);
        const pdfPath = response.data.pdfurl;
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfPath);
        //console.log('URL del archivo:', pdfPath);
    } catch (error) {
      console.error('Error durante el envío del archivo', error);
    } finally {
      this.isLoading = false;
    }
  }
  //funcion para guardar el audio y la partitura en favoritos del usuario
    saveToFavorites() {
      console.log('Guardando en favoritos');
      axios.post('http://localhost:8000/api/audio/favorite', {
        pdfurl: this.pdfUrl,

      })
    }

}
