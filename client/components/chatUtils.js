import { bot, user } from './domElements';

function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);
  
    return `id-${timestamp}-${hexadecimalString}`;
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
  

export { generateUniqueId, typeText, chatStripe };