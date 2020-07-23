import { TestBed } from '@angular/core/testing';

import { DeleteItemService } from './delete-item.service';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';


describe('DeleteItemService', () => {
  let service: DeleteItemService;

  const dialogRefStub = {
    afterClosed() {
      return of({data: 'cardName'});
    }
  };
  const dialogStub = { open: () => dialogRefStub };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MatDialog, useValue: dialogStub }
      ]
    });
    service = TestBed.inject(DeleteItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Check card List with deleted', () => {
    const cardList = [{
      name: 'list1',
      status: 'list1'
    }];
    spyOn(service, 'deleteItemsDialog').and.callThrough();
    service.deleteItemsDialog(0, 0, cardList);
    expect(service.deleteItemsDialog).toHaveBeenCalledWith(0, 0, cardList);
  });

  it('Check card deleted', () => {
    const cardList = [{
      name: 'list1',
      status: 'list1'
    }];
    spyOn(service, 'deleteItemsDialog').and.callThrough();
    service.deleteItemsDialog('', 0, cardList);
    expect(service.deleteItemsDialog).toHaveBeenCalledWith('', 0, cardList);
  });
});

