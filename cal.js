"use strict"

const DAYS = [" S", " M", "Tu", " W", "Th", " F", " S"]
const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]

const write = (s, x, y, grid) => {
  if (!grid[y]) grid[y] = ""

  while (grid[y].length < x) grid[y] = grid[y] + " "

  grid[y] = grid[y] + s

  return grid
}

const drawMonth = (month, year, title, x, y, grid) => {
  var date, day, t

  grid = write(title, x + 10 - Math.ceil(title.length / 2), y, grid)
  y++

  for (day = 0; day < DAYS.length; day++) {
    grid = write(DAYS[day], x + 3 * day, y, grid)
  }
  y++

  date = new Date(Date.UTC(year, month - 1, 1))
  t = x + 3 * date.getUTCDay()
  while (date.getUTCMonth() + 1 === month) {
    grid = write((" " + date.getUTCDate()).substr(-2), t, y, grid)
    date = new Date(Date.UTC(year, month - 1, date.getUTCDate() + 1))
    if (date.getUTCDay() === 0) {
      y++
      t = x
    } else {
      t += 3
    }
  }

  return grid
}

const cal = args => {
  var DAY, MONTH, YEAR
  var date, grid, month

  grid = []
  if (args.length === 1) {
    // show year
    YEAR = parseInt(args[0])
    grid = write(String(YEAR), 30, 0, grid)
    for (month = 0; month < 12; month++) {
      grid = drawMonth(month + 1, YEAR, MONTHS[month], 22 * (month % 3), 2 + 8 * ((month / 3)|0), grid)
    }
  } else {
    // show month
    date = new Date()
    MONTH = args.length === 2 ? parseInt(args[0]) : (date.getMonth() + 1)
    YEAR = args.length ===2 ? parseInt(args[1]) : date.getFullYear()
    grid = drawMonth(MONTH, YEAR, MONTHS[MONTH - 1] + " " + YEAR, 0, 0, grid)
  }

  return grid.join("\n")
}

module.exports = cal
