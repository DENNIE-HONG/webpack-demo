
import './alertTip.scss';
export function tip (text) {
  $('.alert-tip').remove();
  let insertStr = require('./alertTip.art')({
    text: text
  });
  $('body').append(insertStr);

}
export function noUsedTip () {
  console.log('这是没用的');
}