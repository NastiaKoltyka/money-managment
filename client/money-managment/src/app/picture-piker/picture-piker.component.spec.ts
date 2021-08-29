import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicturePikerComponent } from './picture-piker.component';

describe('PicturePikerComponent', () => {
  let component: PicturePikerComponent;
  let fixture: ComponentFixture<PicturePikerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicturePikerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicturePikerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
