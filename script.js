// ===== MODO OSCURO =====
function toggleDark() {
  document.body.classList.toggle("dark");
}

// ===== REVEAL ANIMATION =====
let ticking = false;
function reveal() {
  const reveals = document.querySelectorAll(".reveal");
  const windowHeight = window.innerHeight;
  const visibleThreshold = 100;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - visibleThreshold) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      reveal();
      ticking = false;
    });
    ticking = true;
  }
});
reveal(); // Inicial

// ===== TYPING HERO (solo si existe el elemento) =====
const typingElement = document.getElementById("typing");
if (typingElement) {
  const text = "Josué Abraham Hernández"; // o cámbialo por "IT Segurity" si prefieres
  let i = 0;
  function typing() {
    if (i < text.length) {
      typingElement.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, 80);
    }
  }
  typing();
}

// ===== FORMULARIO CONTACTO (solo si existe el formulario) =====
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

  // Validación en tiempo real
  nameInput.addEventListener("input", () => validateField(nameInput, nameError, "El nombre es obligatorio"));
  emailInput.addEventListener("input", validateEmail);
  messageInput.addEventListener("input", () => validateField(messageInput, messageError, "El mensaje no puede estar vacío"));

  function validateField(input, errorElement, message) {
    if (input.value.trim() === "") {
      errorElement.textContent = message;
      return false;
    } else {
      errorElement.textContent = "";
      return true;
    }
  }

  function validateEmail() {
    const email = emailInput.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      emailError.textContent = "El correo es obligatorio";
      return false;
    } else if (!regex.test(email)) {
      emailError.textContent = "Ingresa un correo válido";
      return false;
    } else {
      emailError.textContent = "";
      return true;
    }
  }

  function validateForm() {
    const validName = validateField(nameInput, nameError, "El nombre es obligatorio");
    const validEmail = validateEmail();
    const validMessage = validateField(messageInput, messageError, "El mensaje no puede estar vacío");
    return validName && validEmail && validMessage;
  }

  // Enviar a WhatsApp
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    if (!validateForm()) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    const phone = "50589871374"; // Número WhatsApp sin +
    const text = `Hola Josué, soy ${name}%0AEmail: ${email}%0AMensaje: ${message}`;
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  });
}

// ===== BOTÓN VOLVER ARRIBA =====
const btnTop = document.getElementById("btnTop");
if (btnTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btnTop.classList.add("visible");
    } else {
      btnTop.classList.remove("visible");
    }
  });

  btnTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ===== RESALTAR LINK ACTIVO =====
const sections = document.querySelectorAll("section[id], div[id]");
const navLinks = document.querySelectorAll("nav a");

if (sections.length && navLinks.length) {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.6
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          link.removeAttribute("aria-current");
          if (link.getAttribute("href") === `#${id}`) {
            link.setAttribute("aria-current", "page");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}
