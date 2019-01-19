import { SET_CALENDAR_DETAIL_LEVEL, SET_CALENDAR_FOCUS } from '../actions/app'

const appReducer = (app = {}, action) => {
  switch (action.type) {
    case SET_CALENDAR_DETAIL_LEVEL:
      return app.setIn(['calendar', 'level'], action.level)
    case SET_CALENDAR_FOCUS:
      return app.setIn(['calendar', 'focus'], action.focus)
    default:
      return app
  }
}

export default appReducer
