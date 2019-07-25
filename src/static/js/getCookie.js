function getCookie(name) {
  const cookie = document.cookie;
  let value = '';
  if(!cookie){
    return undefined
  }
  const cookieArr = cookie.split('; ')
  for (let i = 0; i < cookieArr.length; i++) {
    const arr = cookieArr[i].split('=');
    if(arr[0] == name){
      value = unescape(arr[1]);
      return value
    }
  }
}
export {
  getCookie
}
















