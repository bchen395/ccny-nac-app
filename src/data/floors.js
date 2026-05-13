export const alerts = [
  'Escalator maintenance alert',
  'Room 242 under construction',
  'West Wing Staircase closed',
  'One Stop Hours shortened 4/25',
];

export const floors = [
  {
    id: 1,
    name: 'Floor 1',
    youAreHere: { x: 470, y: 500 },
    hallway: [
      { x: 94, y: 285, width: 700, height: 74 },
      { x: 408, y: 126, width: 88, height: 374 },
    ],
    landmarks: [
      { label: 'Main Hall', x: 525, y: 322 },
      { label: 'Atrium', x: 450, y: 118 },
    ],
    rooms: [
      { id: 'lobby', name: 'Lobby', x: 90, y: 392, width: 230, height: 92 },
      { id: 'room-101', name: 'Room 101', x: 84, y: 144, width: 178, height: 112 },
      { id: 'room-102', name: 'Room 102', x: 294, y: 144, width: 112, height: 112 },
      { id: 'room-103', name: 'Room 103', x: 514, y: 144, width: 156, height: 112 },
      { id: 'cafeteria', name: 'Cafeteria', x: 604, y: 392, width: 190, height: 92 },
    ],
  },
  {
    id: 2,
    name: 'Floor 2',
    youAreHere: { x: 470, y: 500 },
    hallway: [
      { x: 112, y: 282, width: 650, height: 74 },
      { x: 438, y: 116, width: 86, height: 384 },
    ],
    landmarks: [
      { label: 'Central Lounge', x: 536, y: 324 },
      { label: 'Balcony', x: 472, y: 112 },
    ],
    rooms: [
      { id: 'room-201', name: 'Room 201', x: 92, y: 138, width: 178, height: 116 },
      { id: 'room-202', name: 'Room 202', x: 298, y: 138, width: 130, height: 116 },
      { id: 'room-203', name: 'Room 203', x: 536, y: 138, width: 156, height: 116 },
      { id: 'ballroom', name: 'Ballroom', x: 84, y: 390, width: 270, height: 96 },
      { id: 'room-204', name: 'Room 204', x: 592, y: 390, width: 178, height: 96 },
    ],
  },
  {
    id: 3,
    name: 'Floor 3',
    youAreHere: { x: 470, y: 500 },
    hallway: [
      { x: 96, y: 272, width: 706, height: 84 },
      { x: 448, y: 122, width: 84, height: 378 },
    ],
    landmarks: [
      { label: 'Study Hall', x: 552, y: 320 },
      { label: 'North Wing', x: 458, y: 116 },
    ],
    rooms: [
      { id: 'room-301', name: 'Room 301', x: 88, y: 132, width: 178, height: 112 },
      { id: 'room-302', name: 'Room 302', x: 292, y: 132, width: 134, height: 112 },
      { id: 'room-303', name: 'Room 303', x: 540, y: 132, width: 162, height: 112 },
      { id: 'room-304', name: 'Room 304', x: 92, y: 396, width: 188, height: 90 },
      { id: 'room-305', name: 'Room 305', x: 594, y: 396, width: 188, height: 90 },
    ],
  },
];

export const floorIds = floors.map((floor) => floor.id);
