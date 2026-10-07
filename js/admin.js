const LOGIN = {
    user: 'admin',
    pass: 'symphonie2026'
};

const $ = (selector) => document.querySelector(selector);

function events() {
    try {
        return JSON.parse(localStorage.getItem('orchestre_events')) || DEFAULT_EVENTS;
    } catch {
        return DEFAULT_EVENTS;
    }
}

function saveEvents(eventsToSave) {
    localStorage.setItem('orchestre_events', JSON.stringify(eventsToSave));
}

function refresh() {
    const list = $('#admin-list');

    if (!list) {
        return;
    }

    list.innerHTML = events()
        .map((event) => `
            <div class="admin-row">
                <img src="../${event.image}">
                <div>
                    <b>${event.title}</b>
                    <small>${event.date} · ${event.location}</small>
                </div>
                <button class="delete" data-id="${event.id}">
                    Supprimer
                </button>
            </div>
        `)
        .join('');

    list.querySelectorAll('.delete').forEach((button) => {
        button.onclick = () => {
            saveEvents(events().filter((event) => event.id !== button.dataset.id));
            refresh();
        };
    });
}

function initAdmin() {
    const app = $('#admin-app');
    const login = $('#login');

    if (sessionStorage.getItem('orchestre_admin') === '1') {
        login.hidden = true;
        app.hidden = false;
        refresh();
    } else {
        app.hidden = true;
    }

    $('#login-form')?.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = $('#username').value;
        const password = $('#password').value;

        if (username === LOGIN.user && password === LOGIN.pass) {
            sessionStorage.setItem('orchestre_admin', '1');
            login.hidden = true;
            app.hidden = false;
            refresh();
        } else {
            $('#login-error').textContent = 'Identifiant ou mot de passe incorrect.';
        }
    });

    $('#logout')?.addEventListener('click', () => {
        sessionStorage.removeItem('orchestre_admin');
        location.reload();
    });

    $('#event-form')?.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const file = formData.get('imageFile');

        const finish = (image) => {
            const item = {
                id: Date.now().toString(),
                title: formData.get('title'),
                date: formData.get('date'),
                time: formData.get('time'),
                location: formData.get('location'),
                category: formData.get('category'),
                image: image || formData.get('image') || 'assets/images/event-default.svg',
                description: formData.get('description'),
                details: formData.get('details')
            };

            saveEvents([...events(), item]);
            event.target.reset();
            refresh();
            alert('Événement ajouté.');
        };

        if (file && file.size) {
            const reader = new FileReader();
            reader.onload = () => finish(reader.result);
            reader.readAsDataURL(file);
        } else {
            finish('');
        }
    });
}

document.addEventListener('DOMContentLoaded', initAdmin);
