document.addEventListener("DOMContentLoaded", () => {
  // 1. HEADER SCROLL EFFECT
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // 2. MOBILE HAMBURGER MENU
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      
      // Animate hamburger lines to X
      const spans = menuToggle.querySelectorAll("span");
      if (navLinks.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(6px, -7px)";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });

    // Close menu when clicking links
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        const spans = menuToggle.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      });
    });
  }

  // 3. HERO CARD 3D TILT EFFECT
  const heroCard = document.getElementById("hero-card");
  if (heroCard) {
    heroCard.addEventListener("mousemove", (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate angles based on mouse position relative to card center
      const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg tilt
      const rotateY = ((x - centerX) / centerX) * 10;
      
      heroCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    heroCard.addEventListener("mouseleave", () => {
      heroCard.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  }

  // 4. STATS ANIMATION TRIGGER
  let statsAnimated = false;
  
  function triggerStatsAnimation() {
    const statsSection = document.getElementById("stats-section");
    if (!statsSection || statsAnimated) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          animateStats();
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(statsSection);
  }
  
  function animateStats() {
    const statNums = document.querySelectorAll(".stat-num");
    statNums.forEach(stat => {
      const target = parseInt(stat.getAttribute("data-target"), 10);
      const suffix = stat.getAttribute("data-suffix") || "";
      let current = 0;
      const duration = 1500; // 1.5 seconds animation
      const increment = target / (duration / 16); // ~60fps
      
      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = `${target.toLocaleString('pt-BR')}${suffix}`;
          clearInterval(counter);
        } else {
          stat.textContent = `${Math.floor(current).toLocaleString('pt-BR')}${suffix}`;
        }
      }, 16);
    });
  }

  triggerStatsAnimation();

  // 5. FAQ ACCORDION LOGIC
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const answer = item.querySelector(".faq-answer");
      
      // Close other active items
      document.querySelectorAll(".faq-item").forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
          otherItem.querySelector(".faq-answer").style.maxHeight = null;
        }
      });
      
      item.classList.toggle("active");
      if (item.classList.contains("active")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = null;
      }
    });
  });

  // 6. CONTACT FORM LEADS SUBMISSION VIA EMAIL (FormSubmit AJAX)
  const contactForm = document.getElementById("b2c-contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const name = document.getElementById("lead-name").value.trim();
      const phone = document.getElementById("lead-phone").value.trim();
      const message = document.getElementById("lead-message").value.trim();
      const submitBtn = document.getElementById("form-submit-btn");
      
      if (!name || !phone || !message) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }
      
      // Show loading/sending state on the button
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Enviando...';
      
      // POST to FormSubmit AJAX endpoint
      fetch("https://formsubmit.co/ajax/ascdocumentacao@gmail.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "Nome Completo": name,
          "WhatsApp / Telefone": phone,
          "Caso / Dúvida": message,
          "_subject": "Novo Lead - Site ASC Advocacia"
        })
      })
      .then(response => response.json())
      .then(data => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Mensagem Enviada! ✓';
        alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
        contactForm.reset();
        
        // Reset button state after 3 seconds
        setTimeout(() => {
          submitBtn.innerHTML = 'Enviar Mensagem <i data-lucide="send"></i>';
          if (window.lucide) window.lucide.createIcons();
        }, 3000);
      })
      .catch(error => {
        console.error("Error submitting form:", error);
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Enviar Mensagem';
        alert("Ocorreu um erro ao enviar por e-mail. Por favor, tente novamente ou fale diretamente conosco pelo WhatsApp.");
      });
    });
  }

  // 7. HERO PORTRAIT PARALLAX EFFECT
  const hero = document.querySelector(".hero");
  const portrait = document.querySelector(".hero-portrait-img");
  const circle = document.querySelector(".editorial-circle");
  
  if (hero && portrait && circle) {
    hero.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate offset from center (-1 to 1)
      const offsetX = (clientX - innerWidth / 2) / (innerWidth / 2);
      const offsetY = (clientY - innerHeight / 2) / (innerHeight / 2);
      
      // Move portrait slightly
      portrait.style.transform = `translate(${offsetX * 12}px, ${offsetY * 8}px)`;
      // Move circle in the opposite direction
      circle.style.transform = `translate(calc(-50% + ${offsetX * -8}px), ${offsetY * -6}px)`;
    });
    
    hero.addEventListener("mouseleave", () => {
      portrait.style.transform = "translate(0, 0)";
      circle.style.transform = "translate(-50%, 0)";
    });
  }
});
