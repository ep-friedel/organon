import { DAY, formatTime } from 'UTILS/date'
import { getDayStyle, getEventIcon } from 'UTILS/calendar'

import PropTypes from 'prop-types'
import React from 'react'
import { WeekPropType } from 'PROPTYPES/calendar'
import styles from './WeekList.less'

export function WeekList({ dates, focus, selectDay }) {
  return (
    <div className={styles.outerGrid}>
      {dates.map(({ days, weeknumber }) => (
        <div key={weeknumber} className={styles.innerList}>
          <div key={weeknumber} className={styles.week}>
            {days.map(day => (
              <div key={day.key} className={getDayStyle(day, { focus }, styles)}>
                <div className={styles.numberBlock} onClick={() => selectDay(day.date)}>
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
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

WeekList.propTypes = {
  dates: PropTypes.arrayOf(WeekPropType),
  focus: PropTypes.instanceOf(Date),
  selectDay: PropTypes.func.isRequired,
}
