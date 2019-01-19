import ImmuTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'

export const DayPropType = PropTypes.shape({
  date: PropTypes.instanceOf(Date).isRequired,
  dayOfWeek: PropTypes.number.isRequired,
  key: PropTypes.string.isRequired,
})

export const WeekPropType = PropTypes.shape({
  weeknumber: PropTypes.number.isRequired,
  hasFirstOfMonth: PropTypes.bool.isRequired,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  days: PropTypes.arrayOf(DayPropType),
})

export const EventPropType = ImmuTypes.contains({
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  isFullDay: PropTypes.bool.isRequired,
  endDate: PropTypes.number,
  dateKey: PropTypes.string.isRequired,
  name: PropTypes.string,
  author: PropTypes.string,
  recurring: PropTypes.oneOfType([
    ImmuTypes.contains({
      interval: PropTypes.string,
      units: PropTypes.number,
      times: PropTypes.number,
    }),
    PropTypes.bool,
  ]),
  public: PropTypes.bool.isRequired,
})

export const EventListPropType = ImmuTypes.mapOf(EventPropType)
