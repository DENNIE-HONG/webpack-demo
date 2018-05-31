
export function tip (text) {
  let insertStr = require('./alertTip.art')({
    text: text
  });
  $('body').append(insertStr);
}
export function noUsedTip () {
  console.log('这是没用的');
}