const today = Date.now()
const day = 3600 * 24 * 1000

export default {
  users: {
    u1: {
      name: 'Florian',
      id: 'u1',
    },
    u2: {
      name: 'Mela',
      id: 'u2',
    },
  },
  app: {
    currentUser: 1,
    isAdmin: true,
    busy: ['LOAD_POSTS'],
  },
  posts: [],
  events: {
    e1: {
      id: 'e1',
      type: 'birthday',
      date: today + day * 3,
      name: `Niko`,
      author: 'u1',
      recurring: { interval: 'yearly', times: 0 },
      public: true,
      comments: [
        {
          author: 'u2',
          created: today - day,
          content: 'nur persönlich gratulieren',
        },
      ],
    },
    e2: {
      public: true,
      id: 'e2',
      type: 'event',
      date: today + day * 5,
      created: today - day * 2,
      name: `Niko's Geburtstagsfeier`,
      description: 'Übernachtung geht klar, Schlafsack mitbringen',
      author: 'u1',
      recurring: false,
      comments: [
        {
          author: 'u2',
          created: today - day,
          content: 'Geschenk mitbringen',
        },
      ],
    },
  },
  notes: {
    n1: {
      id: 'n1',
      updated: today - 10000,
      author: 'u1',
      created: today - day,
      content: 'Einkaufsliste',
      public: true,
      list: [
        {
          checked: false,
          content: 'milch',
          id: 'le1',
        },
        {
          checked: false,
          content: 'butter',
          id: 'le2',
        },
      ],
    },
  },
}

//'e1', 'n1', 'e2'
