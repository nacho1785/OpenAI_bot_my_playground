import { scrollToBottom } from './chatUI';	

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

export { loader, typeText };