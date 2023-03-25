import bot from '../assets/bot.svg';
import user from '../assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');
const messageContainer = document.createElement('div');
messageContainer.id = 'message_container';

export { bot, user, form, chatContainer, messageContainer };
