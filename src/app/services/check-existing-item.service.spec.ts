import { TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

import { CheckExistingItemService } from './check-existing-item.service';
import { of } from 'rxjs';

describe('CheckExistingItemService', () => {
  let service: CheckExistingItemService;
  const dialogRefStub = {
    afterClosed() {
      return of({data: 'cardName'});
    }
  };
  const dialogStub = { open: () => dialogRefStub };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule
      ],
      providers: [
        { provide: MatDialog, useValue: dialogStub }
      ]
    });
    service = TestBed.inject(CheckExistingItemService);
  });

  beforeEach(() => {
    service = TestBed.inject(CheckExistingItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Check for card List with same name not found', () => {
    const cardList = [{
      name: 'list1',
      status: 'list1'
    }];
    spyOn(service, 'popupDialog').and.callThrough();
    service.popupDialog('', cardList);
    expect(service.popupDialog).toHaveBeenCalledWith('', cardList);
  });

  it('Check for card with same name found ', () => {
    const cardList = [{
      name: 'list1',
      status: 'list1',
      cards: [{name: 'cardName'}]
    }];
    spyOn(service, 'popupDialog').and.callThrough();
    service.popupDialog(0, cardList);
    expect(service.popupDialog).toHaveBeenCalledWith(0, cardList);
  });

  it('Check for card with same name not found', () => {
    const cardList = [{
      name: 'list1',
      status: 'list1',
      cards: [{name: 'cardName2'}]
    }];
    spyOn(service, 'popupDialog').and.callThrough();
    service.popupDialog(0, cardList);
    expect(service.popupDialog).toHaveBeenCalledWith(0, cardList);
  });

  it('Check List Edited', () => {
    const cardList = [{
      name: 'list1',
      status: 'list1',
      cards: [{name: 'cardName2'}]
    }];
    service.editItem('', 0, 'List', cardList);
  });
});
