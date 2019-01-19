import { DAY, formatTime } from 'UTILS/date'
import { getDayStyle, getEventIcon } from 'UTILS/calendar'

import { DayPropType } from 'PROPTYPES/calendar'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './WeekList.less'

export function DayView({ day }) {
  return (
    <div className={styles.outerGrid}>
      <div key={day.key} className={getDayStyle(day, {}, styles)}>
        <div className={styles.numberBlock}>
          <div className={styles.number}>{day.date.getDate()}</div>
          <div className={styles.dayname}>{DAY[day.dayOfWeek]}</div>
        </div>
        <div className={styles.postBlock}>
          {day.events.toList().map(event => (
            <div key={event.get('id')} className={styles.post}>
              <div className={styles.content}>
                {!event.get('isFullDay') && (
                  <div className={styles.time}>
                    {`${formatTime(event.get('date'))} - ${formatTime(event.get('endDate'))}`}
                  </div>
                )}
                <div className={styles.nameWrapper}>
                  <div className={styles.icon}>{getEventIcon(event)}</div>
                  <div className={styles.name}>{event.get('name')}</div>
                </div>
                <div className={styles.description}>{event.get('description')}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

DayView.propTypes = {
  day: DayPropType,
  focus: PropTypes.instanceOf(Date),
}
