import './BaseStyle.less'

import { MONTH, add } from 'UTILS/date'
import { expandDays, getDateListByLevel } from 'UTILS/calendar'
import { setCalenderDetailLevel, setCalenderFocus } from 'STORE/actions/app'

import { DayView } from 'RAW/calendar/DayView'
import { EventListPropType } from 'PROPTYPES/calendar'
import { Map } from 'immutable'
import React from 'react'
import { WeekGrid } from 'RAW/calendar/WeekGrid'
import { WeekList } from 'RAW/calendar/WeekList'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import styles from './Calendar.less'

export const focusLevels = {
  DETAIL: 'DETAIL',
  LIST: 'LIST',
  OVERVIEW: 'OVERVIEW',
}

export class Calendar extends React.PureComponent {
  constructor(props) {
    super()

    this.state = {}
    this.onScroll = this.onScroll.bind(this)
    this.selectDay = this.selectDay.bind(this)
  }

  static getDerivedStateFromProps({ focus, level, events }) {
    return {
      dates: getDateListByLevel(level, focus, events),
    }
  }

  render() {
    const {
      state: { dates },
      props: { setCalenderDetailLevel },
    } = this

    const { year, month } = dates[0]

    return (
      <div className={styles.frame}>
        <div className={styles.switch}>
          <div className={styles.toggle} onClick={() => setCalenderDetailLevel(focusLevels.LIST)}>
            Listenansicht
          </div>
          <div className={styles.toggle} onClick={() => setCalenderDetailLevel(focusLevels.OVERVIEW)}>
            Monatsansicht
          </div>
        </div>
        <h2 className={styles.header}>{`${year} - ${MONTH[month]}`}</h2>
        {this.renderCalendar()}
      </div>
    )
  }

  renderCalendar() {
    const {
      props: { level, focus },
      state: { dates },
      selectDay,
    } = this

    switch (level) {
      case focusLevels.LIST:
        return (
          <div className={styles.frame} onWheel={this.onScroll}>
            <WeekList {...{ dates, focus, selectDay }} />
          </div>
        )
      case focusLevels.DETAIL:
        return <DayView day={dates[0]} />
      case focusLevels.OVERVIEW:
        return (
          <div className={styles.frame} onWheel={this.onScroll}>
            <WeekGrid {...{ dates, focus, selectDay }} />
          </div>
        )
      default:
        return null
    }
  }

  selectDay(date) {
    const { setCalenderDetailLevel, setCalenderFocus } = this.props

    setCalenderDetailLevel(focusLevels.DETAIL)
    setCalenderFocus(date)
  }

  onScroll(evt) {
    const {
      props: { level, setCalenderFocus, focus },
    } = this

    const direction = evt.deltaY > 0 ? 1 : -1

    evt.preventDefault()

    setCalenderFocus(
      add(focus, {
        D: direction * (level === focusLevels.OVERVIEW ? 14 : 1),
      }),
    )
  }
}

Calendar.defaultProps = {
  level: focusLevels.OVERVIEW,
  focus: new Date(),
  events: new Map(),
}

Calendar.propTypes = {
  events: EventListPropType,
  level: propTypes.oneOf(Object.values(focusLevels)),
  focus: propTypes.instanceOf(Date),
}

export default connect(
  store => ({
    focus: store.getIn(['app', 'calendar', 'focus']),
    level: store.getIn(['app', 'calendar', 'level']),
    events: store.get('events'),
  }),
  { setCalenderDetailLevel, setCalenderFocus },
)(Calendar)
