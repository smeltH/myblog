function getTime(date) {
  const time = new Date(date)
  const year = time.getFullYear() < 10?'0'+time.getFullYear():time.getFullYear();
  const month = time.getMonth() + 1< 10?'0'+ (time.getMonth() + 1):time.getMonth() + 1;
  const day = time.getDate() < 10?'0'+time.getDate():time.getDate();
  const hour = time.getHours() < 10?'0'+time.getHours():time.getHours();
  const min  = time.getMinutes() < 10?'0'+time.getMinutes():time.getMinutes()
  return `${year}-${month}-${day} ${hour}:${min}`
}
export {
  getTime
}
















