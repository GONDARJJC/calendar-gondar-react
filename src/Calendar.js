import React, { Component } from 'react'
import './App.scss'
import * as util from './util'

class Calendar extends Component {
  state = {
    calendar: [],
    monthList: [],
    yearList: [],
    showMonthList: false,
    showYearList: false,
    year: null,
    month: null,
    day: null,
    showCalendar: false,
    value: ''
  }
  calendarRef = React.createRef()

  setCalendar(year, month) {
    let calendar = util.getCalender(year, month)
    calendar = util.chunk(calendar, 7)
    this.setState({
      calendar
    })
  }

  showCalendar = (e, ifShow) => {
    e.stopPropagation()
    this.setState({
      showCalendar: ifShow
    })
  }

  setMonthList() {
    let monthList = util.chunk(util.MonthList, 3)
    this.setState({
      monthList
    })
  }

  setYearList(year) {
    let yearList = util.chunk(util.getYearList(year), 3)
    this.setState({
      yearList
    })
  }

  componentDidMount = () => {
    let self = this
    document.querySelector('#root').onclick = e => {
      if (
        !this.calendarRef.current.contains(e.target) ||
        this.calendarRef.current === e.target
      ) {
        self.setState({
          showCalendar: false
        })
      } else {
      }
    }
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    this.setState(
      {
        year,
        month,
        day
      },
      () => {
        this.setYearList(year)
        this.setMonthList()
        this.setCalendar(this.state.year, this.state.month)
      }
    )
  }

  monthAdd = () => {
    let month = this.state.month + 1
    let year = this.state.year
    if (month > 11) {
      year += 1
      month = month -= 12
    }
    this.setState(
      {
        year,
        month
      },
      () => {
        this.setCalendar(this.state.year, this.state.month)
      }
    )
  }
  yearAdd = () => {
    this.setState(
      {
        year: this.state.year + 1
      },
      () => {
        this.setCalendar(this.state.year, this.state.month)
      }
    )
  }

  monthMinus = () => {
    let month = this.state.month - 1
    let year = this.state.year
    if (month < 0) {
      month += 12
      year -= 1
    }
    this.setState(
      {
        month,
        year
      },
      () => {
        this.setCalendar(this.state.year, this.state.month)
      }
    )
  }
  yearMinus = () => {
    this.setState(
      {
        year: this.state.year - 1
      },
      () => {
        this.setCalendar(this.state.year, this.state.month)
      }
    )
  }

  monthListMinus = () => {
    let year = this.state.year - 1
    this.setState({
      year
    })
  }
  monthListAdd = () => {
    let year = this.state.year + 1
    this.setState({
      year
    })
  }

  monthClick = item => {
    this.setState({
      showMonthList: !this.state.showMonthList,
      month: item.value - 1
    })
    this.setCalendar(this.state.year, item.value - 1)
  }

  yearListMinus = () => {
    let year = this.state.year - 10
    this.setState(
      {
        year
      },
      () => {
        this.setYearList(year)
      }
    )
  }
  yearListAdd = () => {
    let year = this.state.year + 10
    this.setState(
      {
        year
      },
      () => {
        this.setYearList(year)
      }
    )
  }

  yearClick = item => {
    if (item.year === 'pre') {
      let year = item.value
      this.setYearList(year)
      return
    } else if (item.year === 'next') {
      let year = item.value
      this.setYearList(year)
      return
    }
    this.setState({
      showYearList: !this.state.showYearList,
      year: item.value
    })
    this.setCalendar(item.value, this.state.month)
  }

  dayClick = (e, item) => {
    if (item.month === 'next') {
      this.monthAdd()
    } else if (item.month === 'pre') {
      this.monthMinus()
    } else {
      const value = `${this.state.year}-${this.state.month + 1}-${item.day}`
      this.setState({
        value,
        showCalendar: false
      })
      return
    }
  }

  showMonthList = () => {
    this.setState({
      showMonthList: !this.state.showMonthList
    })
  }

  showYearList = () => {
    this.setState({
      showYearList: !this.state.showYearList
    })
  }

  inputClick(e) {
    console.log(e.target)
    e.stopPropagation()
  }

  render() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    return (
      <div className="CalendarAppBox" ref={this.calendarRef}>
        <input
          onChange={() => null}
          value={this.state.value}
          onFocus={e => this.showCalendar(e, true)}
          type="text"
        />
        {this.state.showCalendar && (
          <div className="CalendarApp">
            {/* 年份选择部分 */}
            {this.state.showYearList && (
              <div className="CalendarYear">
                <div className="CalendarHeader">
                  <div className="CalendarHeaderLeftBox HeaderBox">
                    <span
                      onClick={this.yearListMinus}
                      className="arrowIcon doubleLeft"
                    />
                  </div>
                  <div className="CalendarHeaderDateBox HeaderBox">
                    <span>
                      {this.state.yearList &&
                        this.state.yearList[0][0]['label']}
                      -
                      {this.state.yearList &&
                        this.state.yearList[3][2]['label']}
                    </span>
                  </div>
                  <div className="CalendarHeaderRightBox HeaderBox">
                    <span
                      onClick={this.yearListAdd}
                      className="arrowIcon doubleRight"
                    />
                  </div>
                </div>

                <div className="CalendarContent">
                  <table className="CalendarTable">
                    <tbody>
                      {this.state.yearList.map((item, index) => {
                        return (
                          <tr className="CalendarRow" key={index}>
                            {item.map(line => {
                              return (
                                <td
                                  width="33.33%"
                                  key={line.value}
                                  className="CalendarTableCell"
                                >
                                  <div
                                    onClick={() => this.yearClick(line)}
                                    className={
                                      'year ' +
                                      line.year +
                                      (this.state.year === line.value
                                        ? ' thisYear'
                                        : '')
                                    }
                                  >
                                    {line.label}
                                  </div>
                                </td>
                              )
                            })}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {/* 月份选择部分 */}
            {this.state.showMonthList && (
              <div className="CalendarMonth">
                <div className="CalendarHeader">
                  <div className="CalendarHeaderLeftBox HeaderBox">
                    <span
                      onClick={this.monthListMinus}
                      className="arrowIcon doubleLeft"
                    />
                  </div>
                  <div className="CalendarHeaderDateBox HeaderBox">
                    <span>{this.state.year}年</span>
                  </div>
                  <div className="CalendarHeaderRightBox HeaderBox">
                    <span
                      onClick={this.monthListAdd}
                      className="arrowIcon doubleRight"
                    />
                  </div>
                </div>

                <div className="CalendarContent">
                  <table className="CalendarTable">
                    <tbody>
                      {this.state.monthList.map((item, index) => {
                        return (
                          <tr className="CalendarRow" key={index}>
                            {item.map(line => {
                              return (
                                <td
                                  width="33.33%"
                                  key={line.value}
                                  className="CalendarTableCell"
                                >
                                  <div
                                    onClick={() => this.monthClick(line)}
                                    className={'month'}
                                  >
                                    {line.label}
                                  </div>
                                </td>
                              )
                            })}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 日历主体 */}
            <div className="Calendar">
              <div className="CalendarHeader">
                <div className="CalendarHeaderLeftBox HeaderBox">
                  <span
                    onClick={this.yearMinus}
                    className="arrowIcon doubleLeft"
                  />
                  <span
                    onClick={this.monthMinus}
                    className="arrowIcon singleLeft"
                  />
                </div>
                <div className="CalendarHeaderDateBox HeaderBox">
                  <span onClick={this.showYearList}>{this.state.year}年</span>
                  <span onClick={this.showMonthList}>
                    {this.state.month + 1}月
                  </span>
                </div>
                <div className="CalendarHeaderRightBox HeaderBox">
                  <span
                    onClick={this.monthAdd}
                    className="arrowIcon singleRight"
                  />
                  <span
                    onClick={this.yearAdd}
                    className="arrowIcon doubleRight"
                  />
                </div>
              </div>
              <div className="CalendarContent">
                <table className="CalendarTable">
                  <tbody>
                    {this.state.calendar.map((item, index) => {
                      return (
                        <tr className="CalendarRow" key={index}>
                          {item.map(line => {
                            return (
                              <td key={line.day} className="CalendarTableCell">
                                <div
                                  onClick={e => this.dayClick(e, line)}
                                  className={
                                    line.month +
                                    ' day' +
                                    (this.state.month === month &&
                                    line.day === day &&
                                    this.state.year === year
                                      ? ' today'
                                      : '')
                                  }
                                >
                                  {line.day}
                                </div>
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Calendar
