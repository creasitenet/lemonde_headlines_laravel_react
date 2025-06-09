import axios from 'axios';

// Configuration d'axios pour Laravel
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Configuration du token CSRF
const token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.getAttribute('content');
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

// Export axios pour une utilisation globale si nécessaire
window.axios = axios; 