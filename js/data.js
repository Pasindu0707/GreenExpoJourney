/* Shared site data: regions, places and seasons.
   To add a place: add an entry to PLACES with its lat/lon (from Google Maps) and a photo in assets/img/
   (plus its -600.jpg and -1200.jpg copies). Places are listed, and trips drawn, in the order they appear here,
   which runs as one loop round the island. `label` (l, r, t, b, bl or br) sets which side of the pin the name sits. */

window.REGIONS = [
  { id: 'west',    img: 'negombo.jpg',     name: 'North-west coast',  blurb: 'Lagoons, fishing towns and coconut country near the airport.' },
  { id: 'north',   img: 'jaffna.jpg',      name: 'Far north',         blurb: 'Tamil temples, Dutch forts and the island’s northern tip.' },
  { id: 'ancient', img: 'sigiriya.jpg',    name: 'Cultural Triangle', blurb: 'Ancient capitals, giant stupas and a rock fortress.' },
  { id: 'east',    img: 'arugam-bay.jpg',  name: 'East coast',        blurb: 'Reefs, lagoons and surf, best April to September.' },
  { id: 'south',   img: 'galle.jpg',       name: 'Deep south',        blurb: 'Leopards, pilgrims, quiet coves and the old fort at Galle.' },
  { id: 'hills',   img: 'tea-pickers.jpg', name: 'Hill country',      blurb: 'A sacred peak, tea estates, gems and spice gardens.' },
];

window.PLACES = [
  // North-west coast
  { id: 'katunayake', name: 'Katunayake', region: 'west', lat: 7.180, lon: 79.884, img: 'katunayake.jpg', label: 'r',
    tag: 'Arrive here', text: 'The international airport. We meet you at arrivals.', getting: '20 min to Negombo' },
  { id: 'negombo', name: 'Negombo', region: 'west', lat: 7.209, lon: 79.836, img: 'negombo.jpg', label: 'l',
    tag: 'Lagoon and fish market', text: 'Dawn fish market, then a boat through the lagoon’s mangroves.', getting: '20 min from the airport' },
  { id: 'dankotuwa', name: 'Dankotuwa', region: 'west', lat: 7.297, lon: 79.882, img: 'coconut.jpg', label: 'r',
    tag: 'Our home', text: 'Walk a coconut estate and have lunch with us.', getting: '40 min from Negombo' },
  { id: 'chilaw', name: 'Chilaw', region: 'west', lat: 7.576, lon: 79.795, img: 'chilaw.jpg', label: 'l',
    tag: 'Temples and wetlands', text: 'An ancient Shiva temple and a wetland full of pelicans and storks.', getting: '45 min from Dankotuwa' },
  { id: 'puttalam', name: 'Puttalam', region: 'west', lat: 8.036, lon: 79.828, img: 'puttalam.jpg', label: 'r',
    tag: 'Lagoon and salt pans', text: 'A quiet lagoon town, and the way into Wilpattu National Park.', getting: '1 h from Chilaw' },
  { id: 'kalpitiya', name: 'Kalpitiya', region: 'west', lat: 8.230, lon: 79.765, img: 'kalpitiya.jpg', label: 'l',
    tag: 'Dolphins and kitesurfing', text: 'Spinner dolphins November to April, kitesurfing May to October.', getting: '1 h from Puttalam' },

  // Far north
  { id: 'jaffna', name: 'Jaffna', region: 'north', lat: 9.665, lon: 80.010, img: 'jaffna.jpg', label: 'l',
    tag: 'The Tamil north', text: 'Temples, an old Dutch fort, crab curry and the ferry to Delft Island.', getting: '7 h by train from Colombo' },
  { id: 'point-pedro', name: 'Point Pedro', region: 'north', lat: 9.817, lon: 80.233, img: 'point-pedro.jpg', label: 'r',
    tag: 'The northern tip', text: 'The island’s northernmost point: fishing boats, a lighthouse and sand dunes.', getting: '45 min from Jaffna' },

  // Cultural Triangle
  { id: 'anuradhapura', name: 'Anuradhapura', region: 'ancient', lat: 8.311, lon: 80.404, img: 'anuradhapura.jpg', label: 'r',
    tag: 'Ancient capital', text: 'Giant white stupas and a sacred Bo tree planted over 2,000 years ago.', getting: '3.5 h from Jaffna' },
  { id: 'sigiriya', name: 'Sigiriya', region: 'ancient', lat: 7.957, lon: 80.760, img: 'sigiriya.jpg', label: 'l',
    tag: 'Rock fortress', text: 'The 5th-century citadel. Climb it at first light.', getting: '2 h from Anuradhapura' },
  { id: 'polonnaruwa', name: 'Polonnaruwa', region: 'ancient', lat: 7.940, lon: 81.019, img: 'polonnaruwa.jpg', label: 'r',
    tag: 'Medieval capital', text: 'Royal ruins by a vast lake, and the rock-cut Buddhas of Gal Vihara.', getting: '1 h from Sigiriya' },

  // East coast
  { id: 'trincomalee', name: 'Trincomalee', region: 'east', lat: 8.587, lon: 81.233, img: 'pigeon-island.jpg', label: 'r',
    tag: 'Reef and whales', text: 'Clifftop Koneswaram, snorkelling at Pigeon Island and whales in season.', getting: '2 h from Polonnaruwa' },
  { id: 'batticaloa', name: 'Batticaloa', region: 'east', lat: 7.717, lon: 81.700, img: 'batticaloa.jpg', label: 'r',
    tag: 'Lagoons and the old fort', text: 'A lagoon town with a Dutch fort, a lighthouse and its famous “singing fish”.', getting: '3 h from Trincomalee' },
  { id: 'arugam-bay', name: 'Arugam Bay', region: 'east', lat: 6.840, lon: 81.836, img: 'arugam-bay.jpg', label: 'r',
    tag: 'Surf town', text: 'A laid-back surf beach. The point break is best May to September.', getting: '3 h from Batticaloa' },

  // Deep south
  { id: 'yala', name: 'Yala', region: 'south', lat: 6.370, lon: 81.400, img: 'yala.jpg', label: 'r',
    tag: 'Leopards', text: 'Dawn safaris in leopard country. Closed September to mid October.', getting: '2.5 h from Arugam Bay' },
  { id: 'kataragama', name: 'Kataragama', region: 'south', lat: 6.413, lon: 81.335, img: 'kataragama.jpg', label: 'l',
    tag: 'Pilgrim town', text: 'Sacred to Buddhists, Hindus and Muslims. Join the evening puja.', getting: '30 min from Yala' },
  { id: 'tangalle', name: 'Tangalle', region: 'south', lat: 6.024, lon: 80.794, img: 'tangalle.jpg', label: 'r',
    tag: 'Quiet beaches', text: 'Long, empty bays, with turtles nesting at nearby Rekawa.', getting: '1.5 h from Kataragama' },
  { id: 'dikwella', name: 'Dikwella', region: 'south', lat: 5.967, lon: 80.695, img: 'dikwella.jpg', label: 't',
    tag: 'Coves and surf', text: 'Hiriketiya’s horseshoe surf cove and a giant seated Buddha.', getting: '30 min from Tangalle' },
  { id: 'dondra', name: 'Dondra Head', region: 'south', lat: 5.921, lon: 80.589, img: 'dondra.jpg', label: 'br',
    tag: 'The southern tip', text: 'The island’s southernmost point and its tallest lighthouse.', getting: '20 min from Dikwella' },
  { id: 'mirissa', name: 'Mirissa', region: 'south', lat: 5.948, lon: 80.457, img: 'mirissa.jpg', label: 'bl',
    tag: 'Whales and beaches', text: 'Blue whales November to April, then the beach.', getting: '15 min from Dondra Head' },
  { id: 'galle', name: 'Galle', region: 'south', lat: 6.032, lon: 80.217, img: 'galle.jpg', label: 'l',
    tag: 'The fort town', text: 'Sunset on the 17th-century ramparts.', getting: '45 min from Mirissa' },

  // Hill country
  { id: 'ratnapura', name: 'Ratnapura', region: 'hills', lat: 6.683, lon: 80.399, img: 'ratnapura.jpg', label: 'l',
    tag: 'Gems and rainforest', text: 'The city of gems, with waterfalls and Sinharaja rainforest within reach.', getting: '2.5 h from Galle' },
  { id: 'sri-pada', name: 'Sri Pada', region: 'hills', lat: 6.810, lon: 80.499, img: 'sri-pada.jpg', label: 'l',
    tag: 'Adam’s Peak', text: 'Climb through the night for sunrise at the summit, December to May.', getting: 'Trails from Ratnapura or Hatton' },
  { id: 'nuwara-eliya', name: 'Nuwara Eliya', region: 'hills', lat: 6.970, lon: 80.780, img: 'tea-pickers.jpg', label: 'l',
    tag: 'Tea country', text: 'Stay on a tea estate and pluck with the morning shift.', getting: '2 h from Hatton' },
  { id: 'bandarawela', name: 'Bandarawela', region: 'hills', lat: 6.829, lon: 80.990, img: 'bandarawela.jpg', label: 'b',
    tag: 'Cool hill town', text: 'A quiet tea town with cool air and views down to the plains.', getting: '1.5 h from Nuwara Eliya' },
  { id: 'ella', name: 'Ella', region: 'hills', lat: 6.867, lon: 81.046, img: 'ella.jpg', label: 'r',
    tag: 'Trains and hill walks', text: 'The hill-country train and the Nine Arch Bridge.', getting: '30 min from Bandarawela' },
  { id: 'kandy', name: 'Kandy', region: 'hills', lat: 7.290, lon: 80.635, img: 'kandy.jpg', label: 'l',
    tag: 'The hill capital', text: 'Evening puja at the Temple of the Tooth, then the lake.', getting: '4 h from Ella' },
  { id: 'matale', name: 'Matale', region: 'hills', lat: 7.470, lon: 80.620, img: 'spice-garden.jpg', label: 'l',
    tag: 'Spice gardens', text: 'Cinnamon, cardamom, nutmeg and pepper, grown side by side.', getting: '40 min from Kandy' },
];

/* When to go. 2 = best, 1 = fine, 0 = rainy or closed. A general guide; weather varies year to year. */
window.SEASONS = [
  { name: 'West and south coast', where: 'Negombo, Galle, Mirissa, Tangalle', m: [2, 2, 2, 2, 0, 0, 1, 1, 1, 0, 1, 2] },
  { name: 'Kalpitiya', where: 'Dolphins or kitesurfing', m: [2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 2],
    label: (i) => (i >= 4 && i <= 9 ? 'Kitesurfing' : 'Dolphins') },
  { name: 'Hill country', where: 'Kandy, Nuwara Eliya, Ella, Bandarawela', m: [2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 1] },
  { name: 'Sri Pada (Adam’s Peak)', where: 'Pilgrim season December to May', m: [2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 2],
    label: (i) => (i >= 5 && i <= 10 ? 'Off season' : null) },
  { name: 'Cultural Triangle', where: 'Anuradhapura, Sigiriya, Polonnaruwa', m: [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0] },
  { name: 'North', where: 'Jaffna and Point Pedro', m: [1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0] },
  { name: 'East coast', where: 'Trincomalee, Batticaloa, Arugam Bay', m: [0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0] },
  { name: 'Yala National Park', where: 'Closed Sep to mid Oct', m: [2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 1, 2],
    label: (i) => (i === 8 || i === 9 ? 'Closed' : null) },
];
