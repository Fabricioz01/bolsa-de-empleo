// JavaScript principal para ULEAM Empleos - Versión Simplificada

document.addEventListener('DOMContentLoaded', function () {
  initializeApp();
});

function initializeApp() {
  setupNavigation();
  setupBasicForms();
  setupLogout();
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

// Event listeners globales
document.addEventListener('click', function (e) {
  // Manejar clicks en botones de acción simulada
  if (e.target.classList.contains('btn-login')) {
    e.preventDefault();
    simulateAction('login');
    setTimeout(() => {
      window.location.href = 'home.html';
    }, 2000);
  }

  if (e.target.classList.contains('btn-register')) {
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
