import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

function updateChatContainerPadding() {
  const formHeight = form.offsetHeight;
  chatContainer.style.paddingBottom = `${formHeight + 10}px`;
}

function scrollToBottom() {
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function loader(element) {
  element.textContent = '';

  return setInterval(() => {
    element.textContent += '.';
    if (element.textContent === '....') {
      element.textContent = '';
    }
  }, 300);
}

function typeText(element, text) {
  let index = 0;

  const interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
      scrollToBottom();
    }
  }, 20);
}

function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
  return (
    `
    <div class="wrapper ${isAi ? 'ai' : ''}">
      <div class="chat">
        <div class="profile">
          <img src=${isAi ? bot : user} alt="${isAi ? 'bot' : 'user'}" />
        </div>
        <div class="message" id=${uniqueId}>${value}</div>
      </div>
    </div>
  `
  );
}

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



document.addEventListener('DOMContentLoaded', () => {
  const languageModal = document.getElementById('language-modal');
  const languageSelect = document.getElementById('language-select');
  const languageConfirmButton = document.getElementById('language-confirm');

  updateChatContainerPadding();
  
  // Show the language modal
  languageModal.style.display = 'block';

  // Handle language confirmation
  languageConfirmButton.addEventListener('click', () => {
    const selectedLanguage = languageSelect.value;
    displayInitialBotMessage(selectedLanguage);
    languageModal.style.display = 'none';
  });
});

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const selectedModel = data.get('model');

  // user's chatstripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

  // clear the textarea input
  form.reset();

  // bot's chatstripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, ' ', uniqueId);

  // focus scroll to the bottom
  scrollToBottom();

  // specific message div
  const messageDiv = document.getElementById(uniqueId);

  // loading indicator
  const loadInterval = loader(messageDiv);

  const response = await fetch('https://ignabot.onrender.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: data.get('prompt'),
      model: selectedModel,
    }),
  });

  clearInterval(loadInterval);
  messageDiv.innerHTML = '';

  if (response.ok) {
    const responseData = await response.json();
    const parsedData = responseData.bot.trim();

    typeText(messageDiv, parsedData);
  } else {
    const err = await response.text();

    messageDiv.innerHTML = 'Something went wrong';
    alert(err);
  }
};

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    handleSubmit(e);
  }
});