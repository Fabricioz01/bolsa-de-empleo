// JavaScript principal para ULEAM Empleos - Sistema con Roles

document.addEventListener('DOMContentLoaded', function () {
  initializeApp();
});

function initializeApp() {
  setupNavigation();
  setupBasicForms();
  setupLogout();
  setupRoleSystem();
  setupPasswordToggle();
}

// Sistema de roles
function setupRoleSystem() {
  setupRoleToggling();
  setupLoginForm();
  setupRegisterForm();
}

// Configurar el cambio entre roles en formularios
function setupRoleToggling() {
  const roleInputs = document.querySelectorAll('input[name="userType"]');
  roleInputs.forEach((input) => {
    input.addEventListener('change', handleRoleChange);
  });

  // Ejecutar al cargar la página para mostrar campos correctos
  if (roleInputs.length > 0) {
    handleRoleChange();
  }
}

// Manejar cambio de rol
function handleRoleChange() {
  const selectedRole = document.querySelector(
    'input[name="userType"]:checked'
  )?.value;
  const studentFields = document.getElementById('studentFields');
  const recruiterFields = document.getElementById('recruiterFields');

  if (studentFields && recruiterFields) {
    if (selectedRole === 'recruiter') {
      studentFields.style.display = 'none';
      recruiterFields.style.display = 'block';

      // Actualizar campos requeridos
      updateRequiredFields(studentFields, false);
      updateRequiredFields(recruiterFields, true);
    } else {
      studentFields.style.display = 'block';
      recruiterFields.style.display = 'none';

      // Actualizar campos requeridos
      updateRequiredFields(studentFields, true);
      updateRequiredFields(recruiterFields, false);
    }
  }
}

// Actualizar campos requeridos basado en el rol
function updateRequiredFields(container, isRequired) {
  const inputs = container.querySelectorAll('input, select, textarea');
  inputs.forEach((input) => {
    if (isRequired) {
      if (input.hasAttribute('data-required')) {
        input.setAttribute('required', '');
      }
    } else {
      input.removeAttribute('required');
    }
  });
}

// Configurar formulario de login
function setupLoginForm() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopPropagation(); // Detener la propagación del evento

      const userType = document.querySelector(
        'input[name="userType"]:checked'
      )?.value;
      const email = document.getElementById('email')?.value;

      if (this.checkValidity()) {
        showAlert('Iniciando sesión...', 'info');

        // Simular login y redireccionar según el rol
        setTimeout(() => {
          if (userType === 'recruiter') {
            window.location.href = 'company-dashboard.html';
          } else {
            window.location.href = 'home.html';
          }
        }, 1500);
      }

      this.classList.add('was-validated');
    });
  }
}

// Configurar formulario de registro
function setupRegisterForm() {
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopPropagation(); // Detener la propagación del evento

      const userType = document.querySelector(
        'input[name="userType"]:checked'
      )?.value;

      if (this.checkValidity()) {
        showAlert('Creando cuenta...', 'info');

        // Simular registro exitoso
        setTimeout(() => {
          showAlert('¡Cuenta creada exitosamente! Redirigiendo...', 'success');
          setTimeout(() => {
            if (userType === 'recruiter') {
              window.location.href = 'company-dashboard.html';
            } else {
              window.location.href = 'home.html';
            }
          }, 2000);
        }, 1500);
      }

      this.classList.add('was-validated');
    });
  }
}

// Configurar navegación activa
function setupNavigation() {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute('href');
    if (linkPage && linkPage.includes(currentPage)) {
      link.classList.add('active');
    }
  });
}

// Configurar formularios básicos
function setupBasicForms() {
  const forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      showAlert('Formulario enviado correctamente.');
    });
  });
}

// Configurar logout
function setupLogout() {
  const logoutButtons = document.querySelectorAll('.btn-logout');
  logoutButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        showAlert('Sesión cerrada correctamente.', 'info');
        setTimeout(() => {
          window.location.href = '../index.html';
        }, 2000);
      }
    });
  });
}

// Configurar toggle de contraseña
function setupPasswordToggle() {
  const togglePassword = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('password');

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', function () {
      const type =
        passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);

      const icon = this.querySelector('i');
      if (icon) {
        icon.classList.toggle('bi-eye');
        icon.classList.toggle('bi-eye-slash');
      }
    });
  }
}

// Función para mostrar alertas
function showAlert(message, type = 'success') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;

  const container = document.querySelector('.container');
  if (container) {
    container.insertBefore(alertDiv, container.firstChild);
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.remove();
      }
    }, 3000);
  }
}

// Inicializar tooltips de Bootstrap
function initializeTooltips() {
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

// Función para mostrar alertas personalizadas
function showAlert(message, type = 'success') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

  const container = document.querySelector('.container, .container-fluid');
  if (container) {
    container.insertBefore(alertDiv, container.firstChild);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.remove();
      }
    }, 5000);
  }
}

// Función para simular acciones (para el prototipo)
function simulateAction(actionName) {
  const messages = {
    login: '¡Bienvenido! Sesión iniciada correctamente.',
    register: '¡Registro exitoso! Ahora puedes iniciar sesión.',
    apply: '¡Postulación enviada! Te contactaremos pronto.',
    save: 'Información guardada correctamente.',
    contact: 'Mensaje enviado. Nos pondremos en contacto contigo.',
  };

  showAlert(messages[actionName] || 'Acción completada correctamente.');
}

// Función para manejar el logout
function handleLogout() {
  if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
    showAlert('Sesión cerrada correctamente.', 'info');
    setTimeout(() => {
      window.location.href = '../index.html';
    }, 2000);
  }
}

// Función para filtrar trabajos (para jobs.html)
function filterJobs(category = 'all') {
  const jobCards = document.querySelectorAll('.job-card');

  jobCards.forEach((card) => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
      card.classList.add('fade-in');
    } else {
      card.style.display = 'none';
    }
  });
}

// Función para buscar trabajos
function searchJobs(searchTerm) {
  const jobCards = document.querySelectorAll('.job-card');
  const term = searchTerm.toLowerCase();

  jobCards.forEach((card) => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    const company = card
      .querySelector('.job-company')
      .textContent.toLowerCase();
    const description = card
      .querySelector('.card-text')
      .textContent.toLowerCase();

    if (
      title.includes(term) ||
      company.includes(term) ||
      description.includes(term)
    ) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

document.addEventListener('click', function (e) {
  if (
    e.target.classList.contains('btn-login') &&
    !e.target.closest('#loginForm') &&
    !e.target.closest('#registerForm')
  ) {
    e.preventDefault();
    simulateAction('login');
    setTimeout(() => {
      window.location.href = 'home.html';
    }, 2000);
  }

  if (
    e.target.classList.contains('btn-register') &&
    !e.target.closest('#loginForm') &&
    !e.target.closest('#registerForm')
  ) {
    e.preventDefault();
    simulateAction('register');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 2000);
  }

  if (e.target.classList.contains('btn-apply')) {
    e.preventDefault();
    simulateAction('apply');
  }

  if (e.target.classList.contains('btn-save')) {
    e.preventDefault();
    simulateAction('save');
  }

  if (e.target.classList.contains('btn-contact')) {
    e.preventDefault();
    simulateAction('contact');
  }

  if (e.target.classList.contains('btn-logout')) {
    e.preventDefault();
    handleLogout();
  }
});

// Configurar búsqueda en tiempo real
document.addEventListener('input', function (e) {
  if (e.target.id === 'searchJobs') {
    searchJobs(e.target.value);
  }
});

// Configurar filtros de categoría
document.addEventListener('change', function (e) {
  if (e.target.id === 'categoryFilter') {
    filterJobs(e.target.value);
  }
});
