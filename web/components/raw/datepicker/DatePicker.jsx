import './BaseStyle.less'

import { MONTH, add } from 'UTILS/date'

import { EventListPropType } from 'PROPTYPES/calendar'
import { Map } from 'immutable'
import React from 'react'
import { connect } from 'react-redux'
import { cx } from 'UTILS/classnames'
import propTypes from 'prop-types'
import styles from './Calendar.less'

export const intervalls = {
  DAY: 'DAY',
  MONTH: 'MONTH',
  YEAR: 'YEAR',
}

export class Calendar extends React.Component {
  constructor(props) {
    super()

    this.state = {
      date: props.date,
      level: props.level,
    }
  }

  get day() {
    return this.state.date.getDate()
  }

  get month() {
    return this.state.date.getMonth() + 1
  }

  get year() {
    return this.state.date.getFullYear()
  }

  get daysOfMonth() {
    const { date } = this.state
    const days = new Date(this.year, this.month, 0).getDate()

    return Array(days)
      .fill('')
      .map((val, index) => new Date(date).setDate(index))
  }

  render() {
    const {
      state: { level },
    } = this

    return (
      <div className={styles.frame}>
        <div className={styles.grid} onWheel={this.onScroll}>
          {this.renderGrid()}
        </div>
        <div className={styles.selector}>
          <div
            className={cx(styles.focusSelect, { [styles.selected]: level === intervalls.YEAR })}
            onClick={this.setLevel(intervalls.YEAR)}
          >
            <div className={styles.focusType}>Jahr</div>
            <div className={styles.focusValue}>{this.year}</div>
          </div>
          <div
            className={cx(styles.focusSelect, { [styles.selected]: level === intervalls.MONTH })}
            onClick={this.setLevel(intervalls.MONTH)}
          >
            <div className={styles.focusType}>Monat</div>
            <div className={styles.focusValue}>{this.month}</div>
          </div>
          <div
            className={cx(styles.focusSelect, { [styles.selected]: level === intervalls.DAY })}
            onClick={this.setLevel(intervalls.DAY)}
          >
            <div className={styles.focusType}>Tag</div>
            <div className={styles.focusValue}>{this.day}</div>
          </div>
        </div>
      </div>
    )
  }

  renderGrid() {
    const {
      state: { level },
    } = this

    switch (level) {
      case intervalls.DAY:
        const days = this.daysOfMonth
        const beforeDays = Array(days[0].getDay()).fill(<div className={styles.emptyDay} />)
        const afterDays = Array(6 - days[0].getDay()).fill(<div className={styles.emptyDay} />)
        return beforeDays
          .concat(
            days.map(day => (
              <div key={day.getDate()} className={cx(styles.day, { [styles.selected]: day.getDate() === this.day })}>
                {day.getDate()}
              </div>
            )),
          )
          .concat(afterDays)
      case intervalls.MONTH:
        return Array(12)
          .fill('')
          .map((v, index) => (
            <div key={index} className={cx(styles.month, { [styles.selected]: index + 1 === this.month })}>
              {' '}
              {MONTH[index]}
            </div>
          ))
      case intervalls.YEAR:
        return Array(12)
          .fill('')
          .map((v, index) => (
            <div key={index} className={cx(styles.year, { [styles.selected]: index === 6 })}>
              {this.year - 6 + index}
            </div>
          ))
    }
  }

  setLevel(level) {
    this.setState({ level })
  }

  onScroll(evt) {
    const {
      state: { focus },
      props: { level },
    } = this

    const direction = evt.deltaY > 0 ? 1 : -1

    evt.preventDefault()

    this.setState({
      focus: add(focus, {
        D: direction * (level === intervalls.DETAIL ? 1 : 7),
      }),
    })
  }
}

Calendar.defaultProps = {
  level: intervalls.DETAIL,
  focus: new Date(),
  events: new Map(),
}

Calendar.propTypes = {
  events: EventListPropType,
  level: propTypes.oneOf(Object.values(intervalls)),
  focus: propTypes.instanceOf(Date),
}

export default connect(
  store => ({
    focus: store.getIn(['app', 'calendar', 'focus']),
    level: store.getIn(['app', 'calendar', 'level']),
    events: store.get('events'),
  }),
  {},
)(Calendar)
