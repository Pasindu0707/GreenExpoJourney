/* Shared site data: regions, places and seasons.
   To add a place: add an entry to PLACES with its lat/lon (from Google Maps) and a photo in assets/img/.
   Order matters: places are listed, and trips are drawn, in the order they appear here. */

window.REGIONS = [
  { id: 'west',  img: 'negombo.jpg',     name: 'North-west coast', blurb: 'Lagoons, fishing towns and coconut country near the airport.' },
  { id: 'north', img: 'jaffna.jpg',      name: 'North and east',   blurb: 'Tamil temples, old forts and quiet east-coast beaches.' },
  { id: 'hills', img: 'tea-pickers.jpg', name: 'Hill country',     blurb: 'Ancient rock, spice gardens and tea estates.' },
  { id: 'south', img: 'galle.jpg',       name: 'Deep south',       blurb: 'Leopards, whales and the old fort at Galle.' },
];

window.PLACES = [
  { id: 'katunayake', name: 'Katunayake', region: 'west', lat: 7.180, lon: 79.884, img: 'katunayake.jpg',
    tag: 'Arrive here', text: 'The international airport. We meet you at arrivals.', getting: '20 min to Negombo' },
  { id: 'negombo', name: 'Negombo', region: 'west', lat: 7.209, lon: 79.836, img: 'negombo.jpg',
    tag: 'Lagoon and fish market', text: 'Dawn fish market, then a boat through the lagoon’s mangroves.', getting: '20 min from the airport' },
  { id: 'dankotuwa', name: 'Dankotuwa', region: 'west', lat: 7.297, lon: 79.882, img: 'coconut.jpg',
    tag: 'Our home', text: 'Walk a coconut estate and have lunch with us.', getting: '40 min from Negombo' },
  { id: 'chilaw', name: 'Chilaw', region: 'west', lat: 7.576, lon: 79.795, img: 'chilaw.jpg',
    tag: 'Temples and wetlands', text: 'An ancient Shiva temple and a wetland full of pelicans and storks.', getting: '45 min from Dankotuwa' },
  { id: 'puttalam', name: 'Puttalam', region: 'west', lat: 8.036, lon: 79.828, img: 'puttalam.jpg',
    tag: 'Lagoon and salt pans', text: 'A quiet lagoon town, and the way into Wilpattu National Park.', getting: '1 h from Chilaw' },
  { id: 'kalpitiya', name: 'Kalpitiya', region: 'west', lat: 8.230, lon: 79.765, img: 'kalpitiya.jpg',
    tag: 'Dolphins and kitesurfing', text: 'Spinner dolphins November to April, kitesurfing May to October.', getting: '1 h from Puttalam' },
  { id: 'jaffna', name: 'Jaffna', region: 'north', lat: 9.665, lon: 80.010, img: 'jaffna.jpg',
    tag: 'The Tamil north', text: 'Temples, an old Dutch fort, crab curry and the ferry to Delft Island.', getting: '7 h by train from Colombo' },
  { id: 'trincomalee', name: 'Trincomalee', region: 'north', lat: 8.587, lon: 81.233, img: 'pigeon-island.jpg',
    tag: 'Reef and whales', text: 'Clifftop Koneswaram, snorkelling at Pigeon Island and whales in season.', getting: '4 h from Jaffna' },
  { id: 'sigiriya', name: 'Sigiriya', region: 'hills', lat: 7.957, lon: 80.760, img: 'sigiriya.jpg',
    tag: 'Rock fortress', text: 'The 5th-century citadel. Climb it at first light.', getting: '2 h from Trincomalee' },
  { id: 'matale', name: 'Matale', region: 'hills', lat: 7.470, lon: 80.620, img: 'spice-garden.jpg',
    tag: 'Spice gardens', text: 'Cinnamon, cardamom, nutmeg and pepper, grown side by side.', getting: '1.5 h from Sigiriya' },
  { id: 'kandy', name: 'Kandy', region: 'hills', lat: 7.290, lon: 80.635, img: 'kandy.jpg',
    tag: 'The hill capital', text: 'Evening puja at the Temple of the Tooth, then the lake.', getting: '40 min from Matale' },
  { id: 'nuwara-eliya', name: 'Nuwara Eliya', region: 'hills', lat: 6.970, lon: 80.780, img: 'tea-pickers.jpg',
    tag: 'Tea country', text: 'Stay on a tea estate and pluck with the morning shift.', getting: '3 h from Kandy' },
  { id: 'ella', name: 'Ella', region: 'hills', lat: 6.867, lon: 81.046, img: 'ella.jpg',
    tag: 'Trains and hill walks', text: 'The hill-country train and the Nine Arch Bridge.', getting: '2 h from Nuwara Eliya' },
  { id: 'yala', name: 'Yala', region: 'south', lat: 6.370, lon: 81.400, img: 'yala.jpg',
    tag: 'Leopards', text: 'Dawn safaris in leopard country. Closed September to mid October.', getting: '2 h from Ella' },
  { id: 'mirissa', name: 'Mirissa', region: 'south', lat: 5.948, lon: 80.457, img: 'mirissa.jpg',
    tag: 'Whales and beaches', text: 'Blue whales November to April, then the beach.', getting: '2.5 h from Yala' },
  { id: 'galle', name: 'Galle', region: 'south', lat: 6.032, lon: 80.217, img: 'galle.jpg',
    tag: 'The fort town', text: 'Sunset on the 17th-century ramparts.', getting: '2.5 h to the airport' },
];

/* When to go. 2 = best, 1 = fine, 0 = rainy or closed. A general guide; weather varies year to year. */
window.SEASONS = [
  { name: 'West and south coast', where: 'Negombo, Galle, Mirissa', m: [2, 2, 2, 2, 0, 0, 1, 1, 1, 0, 1, 2] },
  { name: 'Kalpitiya', where: 'Dolphins or kitesurfing', m: [2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 2],
    label: (i) => (i >= 4 && i <= 9 ? 'Kitesurfing' : 'Dolphins') },
  { name: 'Hill country', where: 'Kandy, Nuwara Eliya, Ella', m: [2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 1] },
  { name: 'Cultural Triangle', where: 'Sigiriya, Dambulla', m: [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0] },
  { name: 'North', where: 'Jaffna and the islands', m: [1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0] },
  { name: 'East coast', where: 'Trincomalee, Nilaveli', m: [0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0] },
  { name: 'Yala National Park', where: 'Closed Sep to mid Oct', m: [2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 1, 2],
    label: (i) => (i === 8 || i === 9 ? 'Closed' : null) },
];
