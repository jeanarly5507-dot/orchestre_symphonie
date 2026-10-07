const DEFAULT_EVENTS = [
  {
    id: 'concert-lancement',
    title: 'Concert de lancement',
    date: '30-11-2025',
    time: '16:00',
    location: 'Complexe administratif de Vaudreuil',
    category: 'Concert',
    image: 'assets/images/fly.png',
    description: 'Une soirée musicale pour présenter Orchestre Symphonie au public et partager notre passion pour la musique.',
    details: 'Venez découvrir notre ensemble, nos musiciens et un programme pensé pour faire voyager le public entre émotion, énergie et élégance. Les portes ouvrent une heure avant le début du concert.'
  },
  {
    id: 'repetition-generale',
    title: 'Répétition générale',
    date: '2026-11-30',
    time: '17:00',
    location: 'eglise evangelique apocalypse de vaudreuil',
    category: 'Répétition',
    image: 'assets/images/event-repetition.svg',
    description: 'répétition importante avant notre prochaine activite.',
    details: 'Une étape essentielle pour harmoniser les différentes sections de l’orchestre et finaliser le programme.'
  },
  {
    id: 'concert pour notre premier printemps',
    title: 'Concert de gloire',
    date: '29-11-2026',
    time: '16:00',
    location: 'Complexe administratif de Vaudreuil',
    category: 'Concert',
    image: 'assets/images/event-charity.svg',
    description: 'La musique au service de la communauté.',
    details: 'Un concert placé sous le signe du partage et de la solidarité. Une partie des contributions sera destinée à soutenir une initiative communautaire.'
  }
];

function getEvents() {
  try {
    const saved = localStorage.getItem('orchestre_events');
    return saved ? JSON.parse(saved) : DEFAULT_EVENTS;
  } catch { return DEFAULT_EVENTS; }
}
function saveEvents(events) {
  localStorage.setItem('orchestre_events', JSON.stringify(events));
}
function formatDate(date) {
  const normalizedDate = date.includes('-') && !date.includes('T')
    ? date.split('-').reverse().join('-')
    : date;
  const parsedDate = new Date(normalizedDate + 'T12:00:00');

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(parsedDate);
}
