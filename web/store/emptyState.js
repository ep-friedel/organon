import { getDateKey } from 'UTILS/calendar'
const today = Date.now()
const day = 3600 * 24 * 1000

export default {
  users: {
    u_1: {
      name: 'Florian',
      id: 'u_1',
    },
    u_2: {
      name: 'Mela',
      id: 'u_2',
    },
  },
  app: {
    currentUser: 1,
    isAdmin: true,
    busy: [],
    calendar: {},
  },
  posts: ['e_1', 'n_1', 'e_2'],
  events: {
    e_1: {
      id: 'e_1',
      type: 'birthday',
      date: today + day * 3,
      isFullDay: true,
      dateKey: getDateKey(new Date(today + day * 3)),
      name: `Niko`,
      author: 'u_1',
      recurring: { interval: 'year', units: 1, times: 0 },
      public: true,
      comments: [
        {
          author: 'u_2',
          created: today - day,
          content: 'nur persönlich gratulieren',
        },
      ],
    },
    e_6: {
      id: 'e_6',
      type: 'event',
      date: today + day * 3,
      isFullDay: true,
      dateKey: getDateKey(new Date(today + day * 3)),
      name: `Zahnarzt`,
      author: 'u_1',
      recurring: false,
      public: true,
      comments: [
        {
          author: 'u_2',
          created: today - day,
          content: 'nur persönlich gratulieren',
        },
      ],
    },
    e_4: {
      id: 'e_4',
      type: 'event',
      date: today + day * 2,
      isFullDay: false,
      endDate: today + day * 2 + 7200000,
      dateKey: getDateKey(new Date(today + day * 2)),
      name: `Klettern`,
      author: 'u_1',
      recurring: { interval: 'day', units: 14, times: 0 },
      public: true,
      comments: [
        {
          author: 'u_2',
          created: today - day,
          content: 'nur persönlich gratulieren',
        },
      ],
    },
    e_2: {
      public: true,
      id: 'e_2',
      type: 'event',
      isFullDay: true,
      date: today + day * 5,
      dateKey: getDateKey(new Date(today + day * 5)),
      created: today - day * 2,
      name: `Niko's Geburtstagsfeier`,
      description: 'Übernachtung geht klar, Schlafsack mitbringen',
      author: 'u_1',
      recurring: false,
      comments: [
        {
          author: 'u_2',
          created: today - day,
          content: 'Geschenk mitbringen',
        },
      ],
    },
    e_3: {
      public: true,
      id: 'e_3',
      type: 'event',
      date: today + day * 6,
      dateKey: getDateKey(new Date(today + day * 6)),
      created: today - day * 2,
      name: `Niko's Geburtstagsfeier2`,
      isFullDay: false,
      endDate: today + day * 2 + 12 * 3600000,
      description: 'Übernachtung geht klar, Schlafsack mitbringen',
      author: 'u_1',
      recurring: false,
      comments: [
        {
          author: 'u_2',
          created: today - day,
          content: 'Geschenk mitbringen',
        },
      ],
    },
    e_5: {
      public: true,
      id: 'e_5',
      type: 'event',
      date: today + day * 6,
      dateKey: getDateKey(new Date(today + day * 6)),
      created: today - day * 2,
      name: `Heimfahrt Leipzig`,
      isFullDay: false,
      endDate: today + day * 2 + 6 * 3600000,
      description: 'Übernachtung geht klar, Schlafsack mitbringen',
      author: 'u_1',
      recurring: false,
      comments: [
        {
          author: 'u_2',
          created: today - day,
          content: 'Geschenk mitbringen',
        },
      ],
    },
  },
  notes: {
    n_1: {
      id: 'n_1',
      updated: today - 10000,
      author: 'u_1',
      type: 'note',
      created: today - day,
      name: 'Einkaufsliste',
      content: 'blah blubb',
      public: true,
      list: [
        {
          checked: false,
          content: 'milch',
          id: 'le_1',
        },
        {
          checked: false,
          content: 'butter',
          id: 'le_2',
        },
      ],
    },
  },
}

// 'e1', 'n1', 'e2'
