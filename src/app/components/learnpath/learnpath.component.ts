import { Component, Renderer2, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-learnpath',
  standalone: true,
  imports: [],
  templateUrl: './learnpath.component.html',
  styleUrls: ['./learnpath.component.css']
})
export class LearnpathComponent {
  @ViewChild('dropdown', { static: false }) dropdown: ElementRef | undefined;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit() {
    this.renderer.listen(this.dropdown?.nativeElement, 'toggle', () => {
      if (this.dropdown?.nativeElement.open) {
        this.scrollToSummary(this.dropdown?.nativeElement);
      }
    });
  }

  scrollToSummary(element: HTMLElement) {
    const summary = element.querySelector('summary');
    if (summary) {
      const rect = summary.getBoundingClientRect();
      window.scrollTo({
        top: window.scrollY + rect.top,
        behavior: 'smooth'
      });
    }
  }
}
