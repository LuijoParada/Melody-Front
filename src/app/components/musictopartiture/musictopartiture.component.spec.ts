import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusictopartitureComponent } from './musictopartiture.component';

describe('MusictopartitureComponent', () => {
  let component: MusictopartitureComponent;
  let fixture: ComponentFixture<MusictopartitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusictopartitureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusictopartitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
