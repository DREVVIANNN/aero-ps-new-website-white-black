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
    typingBubble.textContent = "loading...";
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
      case 'Siapa pemilik AERO-PS?':
        return '@Satya dan @Faisal adalah pendiri sekaligus founder dari AERO-PS, merekalah yang berjasa untuk membangun server dan memberikan update menarik pada server.';
      case 'Apa yang diberikan kepada newbie?':
        return 'Server ini memberikan role staff gratis kepada playernya, dan beberapa assets game yang bernilai cukup tinggi/banyak. dan owner server juga memberikan experience yang bagus sekaligus yang terbaik untuk playernya.';
      case 'About InPanels':
        return 'InPanels/InP adalah kelompok website developer yang di bangun oleh @DREVVIANN dan merekalah yang bertanggung jawab untuk membangun website AERO-PS dan memberikan update terbaru untuk kebutuhan website itu sendiri.';
      case 'I got a bug on the website':
        return 'Jika anda menemukan sebuah bug di dalam website ini anda bisa mengabari team kami lewat group whatsapp/melalui menu contact us, tapi sayangnya contact us sedang dalam pengerjaan oleh tim InPanels.✨';
      default:
        return 'There is an error try again later.';
    }
  }
  

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB3sHhVM917EKwEIcU7g7oAztkDhei-Fpc",
    authDomain: "aero-ps.firebaseapp.com",
    projectId: "aero-ps",
    storageBucket: "aero-ps.firebasestorage.app",
    messagingSenderId: "343832941880",
    appId: "1:343832941880:web:1e33b70c448d9ed171ddcd"
  };


// Init
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const stars = document.querySelectorAll('.star');
const ratingCountEl = document.getElementById('ratingCount');
const averageRatingDisplay = document.getElementById('averageRatingDisplay');

// Real-time average rating
firebase.firestore().collection("ratings").onSnapshot(snapshot => {
  const ratings = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    if (data.rating) ratings.push(data.rating);
  });

  const totalRatings = ratings.length;
  const average = ratings.reduce((a, b) => a + b, 0) / totalRatings || 0;
  const roundedAvg = (Math.round(average * 10) / 10).toFixed(1);
  averageRatingDisplay.textContent = `${roundedAvg} of ${totalRatings} rating${totalRatings !== 1 ? 's' : ''}`;
});

stars.forEach((star, index) => {
  star.addEventListener('mouseover', () => {
    if (localStorage.getItem('hasRated')) return;
    highlightStars(index + 1, true);
  });

  star.addEventListener('mouseout', () => {
    if (localStorage.getItem('hasRated')) {
      highlightStars(parseInt(localStorage.getItem('userRating')));
    } else {
      resetStars();
    }
  });

  star.addEventListener('click', () => {
    if (localStorage.getItem('hasRated')) {
      showPopup('error', '❌ You have already rated!');
      return;
    }

    const rating = index + 1;

    localStorage.setItem('hasRated', true);
    localStorage.setItem('userRating', rating);

    db.collection('ratings').add({
      rating: rating,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      highlightStars(rating);
      disableStarEvents();
      showPopup('success', `✅ You rated ${rating} star${rating > 1 ? 's' : ''}`);
    }).catch((error) => {
      console.error("Error saving to Firestore:", error);
      showPopup('error', '⚠️ Failed to submit rating.');
    });
  });
});

function disableStarEvents() {
  stars.forEach(star => {
    star.style.pointerEvents = 'none'; // disables all interaction
    star.classList.remove('hovered');  // remove hover effect if any
    star.classList.add('disabled');
  });
}

function highlightStars(count, isHover = false) {
  stars.forEach((star, i) => {
    if (i < count) {
      star.classList.add(isHover ? 'hovered' : 'selected');
      if (!isHover) star.classList.remove('hovered');
    } else {
      star.classList.remove('hovered', 'selected');
    }
  });
}

function resetStars() {
  stars.forEach(star => {
    star.classList.remove('hovered', 'selected');
  });
}


function showPopup(type, message) {
  const popup = document.getElementById(`${type}Popup`);
  popup.textContent = message;
  popup.classList.add('show');

  setTimeout(() => {
    popup.classList.remove('show');
  }, 3000);
}

const hasRated = localStorage.getItem('hasRated');
if (hasRated) {
  highlightStars(parseInt(localStorage.getItem('userRating')));
}

// Dynamically set animation duration based on content width
const track = document.getElementById('scrollTrack');
const totalWidth = track.scrollWidth / 2; // only original part
const kecepatan = 50; // pixels per second

// Set animation duration
const duration = totalWidth / kecepatan; // seconds
track.style.animationDuration = `${duration}s`;

const shareBtn = document.getElementById('shareBtn');

shareBtn.addEventListener('click', async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: document.title,
        text: 'Check out this page!',
        url: window.location.href
      });
      console.log('Shared successfully');
    } catch (err) {
      console.error('Share failed:', err.message);
    }
  } else {
    alert('Sharing not supported in this browser.');
  }
});