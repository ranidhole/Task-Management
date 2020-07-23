import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { DeleteListComponent } from './components/delete-list/delete-list.component';
import { CheckExistingItemService } from './services/check-existing-item.service';
import { DeleteItemService } from './services/delete-item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private checkExistingItem: CheckExistingItemService,
    private deleteItems: DeleteItemService,
    ){}
  cardList: any;
  name: number;
  isReadonly = true;
  deleteDialog: any;
  @ViewChild('list') input;

  ngOnInit(): void {
    this.cardList = JSON.parse(localStorage.getItem('CardList')) || [];
    console.log(this.cardList.carList);
  }

  addList(): void {
    this.checkExistingItem.popupDialog('', this.cardList);
  }

  addCard(index): void {
    this.checkExistingItem.popupDialog(index, this.cardList);
  }

  deleteList(cardIndex, Listindex): void {
    this.deleteItems.deleteItemsDialog(cardIndex, Listindex, this.cardList);
  }

  dropItem(event: CdkDragDrop<string[]>): void{
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  update(index, name, cardIndex= 0): void{
    if (name === 'list') {
      this.cardList[index].status = false;
    } else {
      this.cardList[index].cards[cardIndex].status = false;
    }
  }

  onBlur(cardIndex, index, value, flag): void{
    if (flag === 'list'){
      this.cardList[index].status = true;
    }else{
      this.cardList[index].cards[cardIndex].status = true;
    }
    this.checkExistingItem.editItem(cardIndex, index, value, this.cardList);
  }
}
