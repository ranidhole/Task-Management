import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { CheckExistingItemService } from './services/check-existing-item.service';
import { DeleteItemService } from './services/delete-item.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture;
  const cardList = [{
    name: 'list1',
    status: 'list1',
    cards: [{
      name: 'cardName'
    }]
  }];
  const dialogRefStub = {
    afterClosed() {
      return of({data: 'cardName'});
    }
  };

  const mockService = {
    popupDialog: () => {
    },
    editItem: () => {

    }
  };

  const mockDeleteService = {
    deleteItemsDialog: () => {
    }
  };

  const dialogStub = { open: () => dialogRefStub };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: DeleteItemService, useValue: mockDeleteService },
        { provide: CheckExistingItemService, useValue: mockService },
        { provide: MatDialog, useValue: dialogStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('Check list added ', () => {
    spyOn(component['checkExistingItem'], 'popupDialog');
    component.addList();
    expect(component['checkExistingItem'].popupDialog).toHaveBeenCalled();
  });

  it('Check card added', () => {
    spyOn(component['checkExistingItem'], 'popupDialog');
    component.addCard(0);
    expect(component['checkExistingItem'].popupDialog).toHaveBeenCalled();
  });

  it('Check card or list edited', () => {
    const cardList = [{
      name: 'list1',
      status: 'list1'
    }];
    spyOn(component['checkExistingItem'], 'editItem');
    component.onBlur(0, 0 , 'name');
    expect(component['checkExistingItem'].editItem).toHaveBeenCalled();
  });

  it('Check card or list edited', () => {
    const cardList = [{
      name: 'list1',
      status: 'list1'
    }];
    spyOn(component['deleteItems'], 'deleteItemsDialog');
    component.deleteList(0, 0);
    expect(component['deleteItems'].deleteItemsDialog).toHaveBeenCalled();
  });

  it('On edit change readonly flag', () => {
    component.isReadonly = false;
    spyOn(component, 'update').and.callThrough();
    component.update();
    expect(component.update).toHaveBeenCalled();
    expect(component.isReadonly).toBeTruthy();
  });
});
