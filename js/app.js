function qs(selector) {
    return document.querySelector(selector);
}

function pagePath(file) {
    const isInPagesOrAdmin = location.pathname.includes('/pages/')
        || location.pathname.includes('/admin/');

    return isInPagesOrAdmin ? file : `pages/${file}`;
}

function initMenu() {
    const menuButton = qs('.menu-btn');
    const menu = qs('.header nav');

    if (!menuButton || !menu) {
        return;
    }

    menuButton.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
            menuButton.setAttribute('aria-expanded', 'false');
        });
    });
}

function renderEvents(target = '#events-grid', limit = 3) {
    const container = qs(target);

    if (!container) {
        return;
    }

    const events = getEvents()
        .slice()
        .sort((firstEvent, secondEvent) =>
            firstEvent.date.localeCompare(secondEvent.date)
        )
        .slice(0, limit);

    container.innerHTML = events.map((event) => `
        <article class="event-card">
            <img src="${event.image}" alt="${event.title}">
            <div class="event-body">
                <span class="tag">${event.category}</span>
                <h3>${event.title}</h3>
                <p class="muted">${formatDate(event.date)} · ${event.time}</p>
                <p>${event.description}</p>
                <a class="text-link" href="evenement.html?id=${encodeURIComponent(event.id)}">
                    Voir les détails →
                </a>
            </div>
        </article>
    `).join('');
}

function renderAllEvents() {
    const container = qs('#all-events');

    if (!container) {
        return;
    }

    const events = getEvents()
        .slice()
        .sort((firstEvent, secondEvent) =>
            firstEvent.date.localeCompare(secondEvent.date)
        );

    container.innerHTML = events.map((event) => `
        <article class="event-card">
            <img src="../${event.image}" alt="${event.title}">
            <div class="event-body">
                <span class="tag">${event.category}</span>
                <h3>${event.title}</h3>
                <p class="muted">${formatDate(event.date)} · ${event.time}</p>
                <p>${event.description}</p>
                <a class="text-link" href="evenement.html?id=${encodeURIComponent(event.id)}">
                    Plus de détails →
                </a>
            </div>
        </article>
    `).join('');
}

function renderDetail() {
    const container = qs('#event-detail');

    if (!container) {
        return;
    }

    const id = new URLSearchParams(location.search).get('id');
    const event = getEvents().find((item) => item.id === id);

    if (!event) {
        container.innerHTML = `
            <div class="empty">
                <h2>Événement introuvable</h2>
                <a class="btn btn-gold" href="evenements.html">
                    Retour aux événements
                </a>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="detail-image">
            <img src="../${event.image}" alt="${event.title}">
        </div>
        <div class="detail-copy">
            <span class="tag">${event.category}</span>
            <h1>${event.title}</h1>
            <div class="detail-meta">
                <span>📅 ${formatDate(event.date)}</span>
                <span>🕐 ${event.time}</span>
                <span>📍 ${event.location}</span>
            </div>
            <p class="lead">${event.description}</p>
            <p>${event.details}</p>
            <a class="btn btn-gold" href="contact.html">Nous écrire</a>
            <a class="btn btn-outline" href="evenements.html">Tous les événements</a>
        </div>
    `;
}

function init() {
    initMenu();
    renderEvents();
    renderAllEvents();
    renderDetail();
}

document.addEventListener('DOMContentLoaded', init);
