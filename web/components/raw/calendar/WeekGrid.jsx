import { DAYSHORT, MONTH } from 'UTILS/date'
import { getDayStyle, getEventIcon } from 'UTILS/calendar'

import PropTypes from 'prop-types'
import React from 'react'
import { WeekPropType } from 'PROPTYPES/calendar'
import { cx } from 'UTILS/classnames'
import styles from './WeekGrid.less'

export function WeekGrid({ dates, focus, selectDay }) {
  return (
    <div className={styles.outerGrid}>
      {dates.map(({ days, weeknumber, hasFirstOfMonth, month }) => (
        <div key={weeknumber} className={cx(styles.innerGrid, { [styles.firstWeek]: hasFirstOfMonth })}>
          {hasFirstOfMonth && <div className={styles.monthHeader}>{MONTH[month]}</div>}
          <div key={weeknumber} className={styles.week}>
            <div className={styles.weeknumber}>{weeknumber}</div>
            {days.map(day => {
              const eventTypes = getEventTypes(day)
              return (
                <div key={day.key} className={getDayStyle(day, { focus }, styles)} onClick={() => selectDay(day.date)}>
                  <div className={styles.numberBlock}>
                    <div className={styles.number}>{day.date.getDate()}</div>
                    <div className={styles.dayname}>{DAYSHORT[day.dayOfWeek]}</div>
                  </div>
                  {Object.keys(eventTypes).map(type => {
                    const events = eventTypes[type]
                    return (
                      <div key={type} className={styles.icon}>
                        {getEventIcon(events[0])}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

WeekGrid.propTypes = {
  dates: PropTypes.arrayOf(WeekPropType),
  focus: PropTypes.instanceOf(Date),
  selectDay: PropTypes.func.isRequired,
}

function getEventTypes(day) {
  return day.events.toList().reduce((types, event) => {
    const evtType = event.get('type')
    types[evtType] = types[evtType] ? [...types[evtType], event] : [event]
    return types
  }, {})
}
