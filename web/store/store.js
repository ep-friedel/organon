import { applyMiddleware, compose, createStore } from 'redux'

import { addActionId } from './middleware/addActionId.js'
import { apiMiddleware } from './middleware/api.js'
import { fromJS } from 'immutable'
import { logMiddleware } from './middleware/logger.js'
import reducers from './reducers.js'

const today = Date.now()
const day = 3600 * 24 * 1000

const defaultStore = window.defaultStore
  ? window.defaultStore
  : fromJS({
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
      },
      posts: ['e1', 'n1', 'e2'],
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
    })

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export function configureStore(initialState = {}) {
  const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(addActionId, apiMiddleware, logMiddleware)))
  return store
}

export const store = configureStore(defaultStore)
