import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPopup.DialogComponent } from './confirm-popup.dialog.component';

describe('ConfirmPopup.DialogComponent', () => {
  let component: ConfirmPopup.DialogComponent;
  let fixture: ComponentFixture<ConfirmPopup.DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmPopup.DialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPopup.DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
