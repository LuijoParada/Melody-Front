import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  images = [
    'carousel1.png', // Cambia estas rutas a las de tus imágenes
    'carousel2.png',
    'carousel3.png',
    'carousel4.png',
  ];
  images2 = [
    'carousel5.png', // Cambia estas rutas a las de tus imágenes
    'carousel6.png',
    'carousel7.png',
    'carousel8.png',
  ]

  currentIndex = 0;
  transition = 'transform 0.5s ease-in-out';

  ngOnInit() {
    this.startAutoSlide();
  }

  startAutoSlide() {
    setInterval(() => {
      this.nextSlide();
    }, 4500);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  getTransform(): string {
    return `translateX(-${this.currentIndex * 100}%)`;
  }
}