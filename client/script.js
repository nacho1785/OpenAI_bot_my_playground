import { form, chatContainer, messageContainer, updateChatContainerPadding, scrollToBottom, loader, typeText, generateUniqueId, chatStripe, displayInitialBotMessage, setAppBackgroundAndPlaceholder, updateFaceRotation } from './components';

// Append messageContainer to chatContainer
chatContainer.appendChild(messageContainer);

document.addEventListener('DOMContentLoaded', () => {
  const languageModal = document.getElementById('language-modal');
  const englishButton = document.getElementById('english-button');
  const spanishButton = document.getElementById('spanish-button');
  const faceImage = document.getElementById('face-image');

  updateChatContainerPadding();

  // Show the language modal
  languageModal.style.display = 'block';

  // Make the face image follow the mouse cursor
  languageModal.addEventListener('mousemove', updateFaceRotation);

  // Handle language selection
  englishButton.addEventListener('click', () => {
    displayInitialBotMessage('en');
    setAppBackgroundAndPlaceholder('en');
    languageModal.style.display = 'none';
  });

  spanishButton.addEventListener('click', () => {
    displayInitialBotMessage('es');
    setAppBackgroundAndPlaceholder('es');
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

window.addEventListener('resize', updateChatContainerPadding);