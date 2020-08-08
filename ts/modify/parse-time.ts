export function parseTime(date: string, hour: string): string {
  if (!date) return
  let time = date.split('+')[0].replace('T', ' ')
  if (hour === 'hour') {
    return time
  } else {
    return time.split(' ')[0]
  }
}
