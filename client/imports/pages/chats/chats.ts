import { Component, OnInIt } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import * as Moment from 'moment';
import { Observable } from 'rxjs';
import { Chats, Messages } from '../../../../imports/collections';
import { Chat, MessageType } from '../../../../imports/models';
import { ChatsOptionsComponent } from './chats-options';
import { MessagesPage } from '../messages/messages';
import template from './chats.html';
 
@Component({
  template
})
export class ChatsPage implements OnInit {
  chats;
 
     
   constructor(
    private navCtrl: NavController,
    private popoverCtrl: PopoverController) {
  }
 
  ngOnInit() {
    this.chats = Chats
      .find({})
      .mergeMap((chats: Chat[]) =>
        Observable.combineLatest(
          ...chats.map((chat: Chat) =>
            Messages
              .find({chatId: chat._id})
              .startWith(null)
              .map(messages => {
                if (messages) chat.lastMessage = messages[0];
                return chat;
              })
          )
        )
      ).zone();
  }

showOptions(): void {
    const popover = this.popoverCtrl.create(ChatsOptionsComponent, {}, {
      cssClass: 'options-popover chats-options-popover'
    });
 
    popover.present();
  }
  
  showMessages(chat): void {
    this.navCtrl.push(MessagesPage, {chat});
  }
 
 
  private findChats(): Observable<any[]> {
    return Observable.of([
      {
        _id: '0',
        title: 'Ethan Gonzalez',
         picture: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
        lastMessage: {
          content: 'You on your way?',
          createdAt: Moment().subtract(1, 'hours').toDate(),
          type: MessageType.TEXT
        }
      },
      {
        _id: '1',
        title: 'Bryan Wallace',
        picture: 'https://randomuser.me/api/portraits/thumb/lego/1.jpg',
        lastMessage: {
          content: 'Hey, it\'s me',
          createdAt: Moment().subtract(2, 'hours').toDate(),
          type: MessageType.TEXT
        }
      },
      {
        _id: '2',
        title: 'Avery Stewart',
        picture: 'https://randomuser.me/api/portraits/thumb/women/1.jpg',
        lastMessage: {
          content: 'I should buy a boat',
          createdAt: Moment().subtract(1, 'days').toDate(),
          type: MessageType.TEXT
        }
      },
      {
        _id: '3',
        title: 'Katie Peterson',
        picture: 'https://randomuser.me/api/portraits/thumb/women/2.jpg',
        lastMessage: {
          content: 'Look at my mukluks!',
          createdAt: Moment().subtract(4, 'days').toDate(),
          type: MessageType.TEXT
        }
      },
      {
        _id: '4',
        title: 'Ray Edwards',
        picture: 'https://randomuser.me/api/portraits/thumb/men/2.jpg',
        lastMessage: {
          content: 'This is wicked good ice cream.',
          createdAt: Moment().subtract(2, 'weeks').toDate(),
          type: MessageType.TEXT
        }
       }
    ]);
   }
 
   removeChat(chat: Chat): void {
    Chats.remove({_id: chat._id}).subscribe(() => {
    });
   }
     showOptions(): void {
    const popover = this.popoverCtrl.create(ChatsOptionsComponent, {}, {
      cssClass: 'options-popover chats-options-popover'
    });
 
    popover.present();
  }
}