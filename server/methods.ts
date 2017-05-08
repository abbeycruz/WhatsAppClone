import { Meteor } from 'meteor/meteor';
import { Chats, Messages } from '../imports/collections';
import { MessageType } from '../imports/models';
import { check, Match } from 'meteor/check';

Meteor.methods({

   updateProfile(profile: Profile): void {
    if (!this.userId) throw new Meteor.Error('unauthorized',
      'User must be logged-in to create a new chat');
 
    check(profile, {
      name: nonEmptyString
    });
 
    Meteor.users.update(this.userId, {
      $set: {profile}
    });
  },

  addMessage(type: MessageType, chatId: string, content: string) {

     if (!this.userId) throw new Meteor.Error('unauthorized',
      'User must be logged-in to create a new chat');

    const chatExists = !!Chats.collection.find(chatId).count();
 
    if (!chatExists) {
      throw new Meteor.Error('chat-not-exists',
        'Chat doesn\'t exist');
    }
 
    return {
      messageId: Messages.collection.insert({
        chatId: chatId,
         senderId: this.userId,
        content: content,
        createdAt: new Date(),
        type: type
      })
    };
  }
});