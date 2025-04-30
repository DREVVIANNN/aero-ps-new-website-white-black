// Example notifications
const messages = [
    {
      sender: "DREVVIANN",
      preview: "Upcoming big update to our...",
      full: "Upcoming big update to our official website, we are now on development to make this web perform. thanks for all support to our team"
    },
    {
      sender: "DREVVIANN",
      preview: "We are now doing a big...",
      full: "We are now doing a big update to our website for version 1.13!"
    },
    {
      sender: "DREVVIANN",
      preview: "Hey There!, the server its now...",
      full: "Hey There!, the server its now back online! thanks for our patience."
    },
    {
      sender: "DREVVIANN",
      preview: "Hey There!, we are now doing...",
      full: "Hey There!, we are now doing a development for our website!"
    }
  ];
  
  const notificationsContainer = document.getElementById('notifications');
  const modal = document.getElementById('modal');
  const modalSender = document.getElementById('modalSender');
  const modalMessage = document.getElementById('modalMessage');
  const closeBtn = document.getElementById('closeBtn');
  
  messages.forEach((msg, index) => {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.animationDelay = `${index * 0.2}s`; // stagger effect
    notification.innerHTML = `
      <div class="sender">${msg.sender}<i class="ri-verified-badge-fill"></i></div>
      <div class="preview">${msg.preview}</div>
    `;
  
    notification.addEventListener('click', () => {
      modalSender.textContent = msg.sender;
      modalMessage.textContent = msg.full;
      modal.style.display = 'flex';
    });
  
    notificationsContainer.appendChild(notification);
  });
  
  // Close modal
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  // Also close modal if clicking outside the content
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
  

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