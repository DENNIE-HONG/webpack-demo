
export function tip (text) {
  console.log(text);
  let insertStr = require('./alertTip.art')({
    text: text
  });
  console.log(insertStr);
  $('body').append(insertStr);
}
export function noUsedTip () {
  console.log('这是没用的');
}