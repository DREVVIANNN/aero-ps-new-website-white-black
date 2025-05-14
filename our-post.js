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
  
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB3sHhVM917EKwEIcU7g7oAztkDhei-Fpc",
    authDomain: "aero-ps.firebaseapp.com",
    projectId: "aero-ps",
    storageBucket: "aero-ps.firebasestorage.app",
    messagingSenderId: "343832941880",
    appId: "1:343832941880:web:1e33b70c448d9ed171ddcd"
  };

  // ✅ Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  document.querySelectorAll(".btn-container").forEach((wrap) => {
    const postId = wrap.getAttribute("data-post-id");
    const btn = wrap.querySelector(".like-btn");
    const countSpan = wrap.querySelector(".like-count");
    const docRef = db.collection("likes").doc(postId);

    let hasLiked = localStorage.getItem(`hasLiked_${postId}`) === "true";

    function updateButtonUI() {
      btn.innerHTML = hasLiked
        ? '<i class="ri-heart-fill"></i>'
        : '<i class="ri-heart-line"></i>';
    }

    function loadLikeCount() {
      docRef.get().then((doc) => {
        if (doc.exists) {
          const count = doc.data().count || 0;
          countSpan.textContent = count;
        } else {
          docRef.set({ count: 0 });
          countSpan.textContent = 0;
        }
        updateButtonUI();
      }).catch((err) => {
        console.error(`❌ Error loading ${postId}:`, err);
      });
    }

    btn.addEventListener("click", () => {
      docRef.get().then((doc) => {
        if (!doc.exists) return;

        let count = doc.data().count || 0;

        if (hasLiked) {
          count = Math.max(0, count - 1);
          localStorage.setItem(`hasLiked_${postId}`, "false");
        } else {
          count += 1;
          localStorage.setItem(`hasLiked_${postId}`, "true");
        }

        hasLiked = !hasLiked;

        docRef.update({ count }).then(() => {
          countSpan.textContent = count;
          updateButtonUI();
        });
      });
    });

    loadLikeCount();
  });

  function onDevelopment() {
    alert("disabled for a while...")
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

// Define the messages and URLs to be shared
const shareData1 = {
    message: 'InPanels X AERO-PS',
    url: 'https://www.aero-ps.site/our-post-pageH62hHdGdt7g32gdg987g32gdg2FFDth298-dh829&h92@9yd8ge.html'
};

const shareData2 = {
    message: 'InPanels X AERO-PS',
    url: 'https://www.aero-ps.site/our-post-pageH62hHdGdt7g32gdg987g32gdg2FFDth298-dh829&h92@9yd8ge.html'
};

const shareData3 = {
    message: 'InPanels X AERO-PS',
    url: 'https://www.aero-ps.site/our-post-pageH62hHdGdt7g32gdg987g32gdg2FFDth298-dh829&h92@9yd8ge.html'
};

// Function to share on WhatsApp
function shareToWhatsApp(message, url) {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}%20${encodeURIComponent(url)}`;
    window.open(whatsappUrl, '_blank');
}

// Attach event listeners to each button
document.getElementById('shareButtonWhatsApp1').addEventListener('click', function() {
    shareToWhatsApp(shareData1.message, shareData1.url);
});

document.getElementById('shareButtonWhatsApp2').addEventListener('click', function() {
    shareToWhatsApp(shareData2.message, shareData2.url);
});

document.getElementById('shareButtonWhatsApp3').addEventListener('click', function() {
    shareToWhatsApp(shareData3.message, shareData3.url);
});

const sheet = document.getElementById('bottomSheet');

function openSheet() {
  sheet.classList.add('active');
}

function closeSheet() {
  sheet.classList.remove('active');
}


