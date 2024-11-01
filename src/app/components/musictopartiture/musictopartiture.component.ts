import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-musictopartiture',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './musictopartiture.component.html',
  styleUrls: ['./musictopartiture.component.css']
})
export class MusictopartitureComponent {
  //funcion que bloquea el boton de enviar una vez que se envia el archivo
  disableButton = false; //tenemo que cambiar el componente html para que funcione, es decir, agregar el [disabled]="disableButton" en el boton de enviar
  disableButtonFunction() {
    this.disableButton = true;
  }
  //el archivo seleccionado se guarda en esta variable
  file: File | null = null;

  // Actualiza el archivo seleccionado
  onFileChange(event: any) {
    this.file = event.target.files[0];
    console.log('Archivo seleccionado:', this.file);
  }

  // Enviar el archivo al servidor
  async onSubmit(event: Event) {
    event.preventDefault();
    if (!this.file) {
      console.error('No se ha seleccionado ningún archivo');
      return;
    }
    //this.disableButtonFunction();
    try {
      // Crear un FormData y agregar el archivo
      const formData = new FormData();
      formData.append('audiofile', this.file);

      // Realizar la solicitud POST a la API
      await axios.post('http://localhost:8000/api/audio/convert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }).then((response) => {
        //el servidor responde con el archivo que enviara como return response()->file(storage_path("app/temp/output/{$midiName}"));
        console.log('Respuesta del servidor:', response.data);
        // Descargar el archivo
        const url = window.URL.createObjectURL(new Blob([response.data]));
        console.log('URL del archivo:', url);
      });
    } catch (error) {
      console.error('Error durante el envío del archivo', error);
    }

  }
}
