  document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.addEventListener('contextmenu', e => e.preventDefault());
    });
  });

  window.onload = function() {
    const hamburger = document.getElementById('hamburger');
    const sideMenu = document.getElementById('sideMenu');
    const content = document.getElementById('content');
  
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      sideMenu.classList.toggle('active');
    });
  
    
      hamburger.classList.remove('active');
      sideMenu.classList.remove('active');
    };

    const searchInput = document.getElementById('search-input');
    const paragraphs = document.querySelectorAll('.content p');
    
    searchInput.addEventListener('input', function() {
      const query = searchInput.value.trim().toLowerCase();
    
      // Remove all previous highlights
      paragraphs.forEach(p => {
        p.innerHTML = p.textContent;
      });
    
      if (query === '') {
        return; // If input is empty, do nothing more
      }
    
      let found = false;
    
      paragraphs.forEach(p => {
        const text = p.textContent.toLowerCase();
        if (!found && text.includes(query)) {
          // Highlight only the first match
          const regex = new RegExp(`(${query})`, 'gi');
          p.innerHTML = p.textContent.replace(regex, '<span class="highlight">$1</span>');
    
          // Scroll smoothly to the element
          p.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
          found = true;
        }
      });
    });
    
    const text = "AERO-PS";
    const speed = 100;         // Typing speed (ms)
    const deleteSpeed = 150;    // Deleting speed (ms)
    const waitBeforeDelete = 1000;  // Wait after full text before blinking
    const waitBeforeTypeAgain = 500; // Wait before typing again
    const blinkTimes = 10;      // How many blinks
    
    let i = 0;
    let isDeleting = false;
    let isBlinking = false;
    let blinkCount = 0;
    
    const element = document.getElementById('typewriter-text');
    const cursor = document.getElementById('cursor');
    
    function typeWriter() {
      if (isBlinking) return; // During blinking, don't type/delete
    
      if (isDeleting) {
        i--;
        element.textContent = text.substring(0, i);
      } else {
        i++;
        element.textContent = text.substring(0, i);
      }
    
      let timeout = isDeleting ? deleteSpeed : speed;
    
      if (!isDeleting && i === text.length) {
        startBlinking();
        return;
      } else if (isDeleting && i === 0) {
        isDeleting = false;
        timeout = waitBeforeTypeAgain;
      }
    
      setTimeout(typeWriter, timeout);
    }
    
    function startBlinking() {
      isBlinking = true;
      blinkCount = 0;
      blinkCursor();
    }
    
    function blinkCursor() {
      cursor.style.opacity = (cursor.style.opacity == 0 ? 1 : 0);
      blinkCount++;
    
      if (blinkCount >= blinkTimes * 2) { 
        // blinkTimes * 2 because each blink is 2 toggles (show/hide)
        isBlinking = false;
        isDeleting = true;
        setTimeout(typeWriter, deleteSpeed);
      } else {
        setTimeout(blinkCursor, 300); // Blink speed
      }
    }
    
    // Start the animation
    typeWriter();

  function copyToClipboard(elementId, button) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => {
      const original = button.innerHTML;
      button.innerHTML = '<i class="ri-check-line"></i>';
      button.disabled = true;
      setTimeout(() => {
        button.innerHTML = original;
        button.disabled = false;
      }, 1500);
    }).catch(err => {
      console.error('Copy failed', err);
    });
  }

  function toggleChat() {
    const chat = document.getElementById('chatBox');
  
    if (chat.classList.contains('show')) {
      chat.classList.remove('show');
      chat.classList.add('hide');
  
      // Wait for animation to finish, then hide completely
      setTimeout(() => {
        chat.style.display = 'none';
        chat.classList.remove('hide');
      }, 300);
    } else {
      chat.style.display = 'flex'; // show first so animation can play
      setTimeout(() => {
        chat.classList.add('show');
      }, 10); // short delay to allow transition to trigger
    }
  }
  
  

  function selectOption(userChoice) {
    const chat = document.getElementById('chatMessages');
    const choices = document.getElementById('choiceButtons');

    // Hide buttons
    choices.style.display = "none";

    // User message
    const userMsg = document.createElement('div');
    userMsg.classList.add('chat-bubble', 'user-msg');
    userMsg.textContent = userChoice;
    chat.appendChild(userMsg);

    // Typing animation
    const typingBubble = document.createElement('div');
    typingBubble.classList.add('chat-bubble', 'ai-msg', 'typing');
    typingBubble.textContent = "AR 0-3 is typing...";
    typingBubble.id = "typingBubble";
    chat.appendChild(typingBubble);

    chat.scrollTop = chat.scrollHeight;

    // Simulate typing delay
    setTimeout(() => {
      typingBubble.remove();

      const aiMsg = document.createElement('div');
      aiMsg.classList.add('chat-bubble', 'ai-msg');
      aiMsg.textContent = getAIResponse(userChoice);
      chat.appendChild(aiMsg);

      // Show choices again
      choices.style.display = "flex";

      chat.scrollTop = chat.scrollHeight;
    }, 1200);
  }

  function getAIResponse(choice) {
    switch (choice) {
      case 'Who is CEO Of InPanels?':
        return 'Kuruto is an CEO of InPanels Company, he selling a panel for whatsapp bot. also the price its very cheap.';
      case 'Who is DREVVIANN?':
        return 'DREVVIANN is an logo designer, and web development, also he its partner of the CEO.';
      case 'Are there any active discounts?':
        return 'We have no discount active today.';
      case 'I got a bug on the website':
        return 'You can contact us on the Contact Menu on the navigation bar. but we are now on development, Thanks for helping us to finding a bug on the website✨';
      default:
        return 'There is an error try again later.';
    }
  }
