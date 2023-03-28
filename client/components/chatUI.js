import { form, chatContainer } from './domElements';

function updateChatContainerPadding() {
    const formHeight = form.offsetHeight;
    chatContainer.style.paddingBottom = `${formHeight + 60}px`;
  
    const chatContainerHeight = chatContainer.offsetHeight;
    const viewportHeight = window.innerHeight;
    if (chatContainerHeight >= viewportHeight) {
      chatContainer.style.overflow = 'auto';
    }
  }

function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  export { updateChatContainerPadding, scrollToBottom };
