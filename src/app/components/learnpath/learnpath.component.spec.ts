import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnpathComponent } from './learnpath.component';

describe('LearnpathComponent', () => {
  let component: LearnpathComponent;
  let fixture: ComponentFixture<LearnpathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnpathComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnpathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
