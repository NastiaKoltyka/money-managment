import { TestBed } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToastrServiceMock } from './mocks/toastr.service.mock';

import { NotificationsService } from './notifications.service';

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[],
      providers: [{ provide: ToastrService, useClass: ToastrServiceMock }]
    });
    service = TestBed.inject(NotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get error', () => {
    spyOn(service.toastr, 'error');
    service.error('message');
    expect(service.toastr.error).toHaveBeenCalledWith('message', 'Error!');
  });

  it('should get warning', () => {
    spyOn(service.toastr, 'warning');
    service.warning('message');
    expect(service.toastr.warning).toHaveBeenCalledWith('message', 'Warning!');
  });

  it('should get info', () => {
    spyOn(service.toastr, 'info');
    service.info('message');
    expect(service.toastr.info).toHaveBeenCalledWith('message', 'Info!');
  });

});