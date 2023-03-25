import { generateUniqueId, chatStripe, typeText } from './chatUtils';
import { chatContainer, form } from './domElements';

function displayInitialBotMessage(language) {
    const initialMessages = {
      en: 'Hello, I am an AI, what can I do for you today?',
      es: 'Hola, soy una IA, ¿en qué puedo ayudarte hoy?'
    };
  
    const initialMessage = initialMessages[language];
    const uniqueId = generateUniqueId();
    chatContainer.innerHTML += chatStripe(true, '', uniqueId);
  
    const messageDiv = document.getElementById(uniqueId);
    typeText(messageDiv, initialMessage);
  }

function setAppBackgroundAndPlaceholder(language) {
  const app = document.getElementById('app');
  const textarea = document.querySelector('textarea');
  const chatContainer = document.querySelector('#chat_container');
  const form = document.querySelector('form');
  
  const placeholders = {
    en: 'Ask Nacho...',
    es: 'Pregúntale a Nacho...'
  };
  
  app.style.backgroundColor = '#343541';
  textarea.placeholder = placeholders[language];
  chatContainer.classList.remove('hidden');
  form.classList.remove('hidden');
}

export { displayInitialBotMessage, setAppBackgroundAndPlaceholder };