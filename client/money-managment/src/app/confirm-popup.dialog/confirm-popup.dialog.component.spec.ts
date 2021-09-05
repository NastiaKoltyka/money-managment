import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPopupDialogComponent } from './confirm-popup.dialog.component';

describe('ConfirmPopupDialogComponent', () => {
  let component: ConfirmPopupDialogComponent;
  let fixture: ComponentFixture<ConfirmPopupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmPopupDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPopupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
