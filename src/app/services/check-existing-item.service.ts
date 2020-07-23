import { Injectable } from '@angular/core';
import { AddListComponent } from '../components/add-list/add-list.component';
import { MatDialog } from '@angular/material/dialog';
import { cardListArray, CardExist, ListExist} from '../components/general.const';

@Injectable({
  providedIn: 'root'
})
export class CheckExistingItemService {

  constructor( private dialog: MatDialog) { }
  checkExistingCard: any;

  popupDialog(index: any, cardList: any): void{
    const confirmDialogRef = this.dialog.open(
      AddListComponent,
      {
        width: '500px'
      }
    );
    confirmDialogRef.afterClosed().subscribe(res => {
      if (res){
        if (index !== ''){
          this.checkExistingCard = cardList[index].cards.filter( el => el.name === res.data).length;
          if (this.checkExistingCard > 0){
            alert(CardExist);
          }else{
            cardList[index].cards.push({name: res.data, status: true});
            localStorage.setItem(cardListArray, JSON.stringify(cardList));
          }
        }else{
          const checkExistingList = cardList.filter( el => el.name === res.data).length;
          if (checkExistingList > 0){
            alert(ListExist);
          }else{
            cardList.push({status: true, name: res.data, cards: []});
            localStorage.setItem(cardListArray, JSON.stringify(cardList));
          }
        }
      }
    });
  }

  editItem(cardIndex: any, index: any, value: any, cardList: any): void{
    if (cardIndex !== ''){
      cardList[index].cards[cardIndex].name = value;
      localStorage.setItem('CardList', JSON.stringify(cardList));
    }else{
      cardList[index].name = value;
      localStorage.setItem('CardList', JSON.stringify(cardList));
    }
  }
}
