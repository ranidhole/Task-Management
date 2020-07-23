import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DeleteListComponent } from '../components/delete-list/delete-list.component';
import { cardListArray} from '../components/general.const';

@Injectable({
  providedIn: 'root'
})
export class DeleteItemService {
  constructor( private dialog: MatDialog) { }

  deleteItemsDialog(cardIndex: any, Listindex: any, cardList: any): void{
    const deleteDialog = this.dialog.open(
      DeleteListComponent,
      {
        width: '500px'
      }
    );
    deleteDialog.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        if (cardIndex !== ''){
          cardList[Listindex].cards.splice(cardIndex, 1);
          localStorage.setItem(cardListArray, JSON.stringify(cardList));
        }else{
          cardList.splice(Listindex, 1);
          localStorage.setItem(cardListArray, JSON.stringify(cardList));
        }
      }
    });
  }
}
