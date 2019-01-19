import { add, getWeekNumber } from 'UTILS/date'

import { BirthdayCakeIcon } from 'COMPONENTS/svg/BirthdayCake'
import { CalendarIcon } from 'COMPONENTS/svg/Calendar'
import React from 'react'
import { focusLevels } from 'CONNECTED/Calendar'

export function getDayStyle(day, { focus, grid }, styles) {
  const additionalStyle = []
  if (focus && getDateKey(focus) === day.key) {
    additionalStyle.push(styles.focus)
  }
  if (getDateKey(new Date()) === day.key) {
    additionalStyle.push(styles.today)
  }
  if (!grid) {
    additionalStyle.push(styles.dayList)
  }
  if (day.events.size) {
    additionalStyle.push(styles.hasEvents)
  }
  if (!day.date.getDay()) {
    additionalStyle.push(styles.firstDay)
  }
  if (day.date.getDay() === 6) {
    additionalStyle.push(styles.lastDay)
  }
  return `${styles.day} ${additionalStyle.join(' ')}`
}

export function expandDays(week, events) {
  return {
    ...week,
    days: week.days.map(day => ({
      ...day,
      events: getEventsForDay(events, day.key),
    })),
  }
}

function getEventsForDay(events, key) {
  return events.filter(event => {
    if (!event.get('recurring')) return event.get('dateKey') === key
    return event.get('dateKey') === key || doesEventMatchInterval(event, key)
  })
}

function doesEventMatchInterval(event, key) {
  let diff, isMatchingDate

  switch (event.getIn(['recurring', 'interval'])) {
    case 'year':
      isMatchingDate = event.get('dateKey').slice(4) === key.slice(4)
      diff = isMatchingDate && getYearDiff(event, key)
      break
    case 'month':
      isMatchingDate = event.get('dateKey').slice(6) === key.slice(6)
      diff = isMatchingDate && getMonthDiff(event, key)
      break
    case 'day':
      diff = getDayDiff(event, key)
      isMatchingDate = true
      break
  }
  return (
    isMatchingDate &&
    diff > 0 &&
    !(diff % (event.getIn(['recurring', 'units']) || 1)) &&
    (!event.getIn(['recurring', 'times']) ||
      diff / event.getIn(['recurring', 'units']) < event.getIn(['recurring', 'times']))
  )
}

function getDayDiff(event, key) {
  const [evtYear, evtMonth, evtDay] = event.get('dateKey').split('_')
  const [dayYear, dayMonth, dayDay] = key.split('_')
  const evt = new Date(evtYear, evtMonth, evtDay, 0, 0, 0)
  const day = new Date(dayYear, dayMonth, dayDay, 0, 0, 0)

  return Math.round((day - evt) / (1000 * 60 * 60 * 24))
}

function getMonthDiff(event, key) {
  const [evtYear, evtMonth] = +event.get('dateKey').split('_')
  const [dayYear, dayMonth] = +key.split('_')

  return dayYear * 12 + dayMonth - (evtYear * 12 + evtMonth)
}

function getYearDiff(event, key) {
  const evtYear = +event.get('dateKey').split('_')[0]
  const dayYear = +key.split('_')[0]

  return dayYear - evtYear
}

const cachedGenerateMonth = cache(generateMonth)

export function getDateListByLevel(level, focus, events) {
  switch (level) {
    case focusLevels.LIST:
      return cachedGenerateMonth(focus, true).map(week => expandDays(week, events))
    case focusLevels.DETAIL:
      return generateDay(focus, events)
    case focusLevels.OVERVIEW:
      return cachedGenerateMonth(focus).map(week => expandDays(week, events))
    default:
      return []
  }
}

function generateDay(focus, events) {
  const key = getDateKey(focus)
  return [
    {
      dayOfWeek: focus.getDay(),
      date: focus,
      key,
      events: getEventsForDay(events, key),
    },
  ]
}

function generateWeek(focus, startAtFocus) {
  const baseDay = focus.getDay()
  let days = []

  for (let dayOfWeek = startAtFocus ? baseDay : 0; dayOfWeek <= 6; dayOfWeek++) {
    const date = add(focus, { D: dayOfWeek - baseDay })
    days.push({
      dayOfWeek,
      date,
      key: getDateKey(date),
    })
  }

  const hasFirstOfMonth = days.some(({ date }) => !(date.getDate() - 1))

  return {
    weeknumber: getWeekNumber(focus),
    days,
    hasFirstOfMonth,
    month: days[days.length - 1].date.getMonth(),
    year: days[days.length - 1].date.getFullYear(),
  }
}

function generateMonth(focus, startAtFocus) {
  let month = []

  for (let week = startAtFocus ? 0 : -2; week <= 2; week++) {
    month.push(generateWeek(add(focus, { D: 7 * week }), startAtFocus && !week))
  }

  return month
}

export function getDateKey(date) {
  return `${date.getFullYear()}_${date.getMonth()}_${date.getDate()}`
}

export function getKeyDate(key) {
  const [year, month, date] = key.split('_')
  return new Date(year, month, date, 12, 0, 0, 0)
}

function cache(func) {
  const cache = {}

  return (date, detail) => {
    const base = new Date(date)
    const key = getDateKey(base) + detail

    if (!cache[key]) {
      cache[key] = func(base, detail)
    }
    return cache[key]
  }
}

export function getEventIcon(event) {
  switch (event.get('type')) {
    case 'birthday':
      return <BirthdayCakeIcon />
    default:
      return <CalendarIcon />
  }
}
