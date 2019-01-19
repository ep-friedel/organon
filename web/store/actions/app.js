export const SET_CALENDAR_DETAIL_LEVEL = 'SET_CALENDAR_DETAIL_LEVEL'

/**
 * action to update the detail level of the calendar
 * @param {"OVERVIEW"|"DETAIL"|"LIST"} level
 */
export function setCalenderDetailLevel(level) {
  return {
    type: SET_CALENDAR_DETAIL_LEVEL,
    level,
  }
}

export const SET_CALENDAR_FOCUS = 'SET_CALENDAR_FOCUS'
/**
 * action to update the focus of the calendar
 * @param {Date} focus
 */
export function setCalenderFocus(focus) {
  return {
    type: SET_CALENDAR_FOCUS,
    focus,
  }
}
