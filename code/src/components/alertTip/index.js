export function tip (text) {
  console.log(text);
  let insertStr = `<div>${text}</div>`;
  $('body').append(insertStr);
}
export function noUsedTip () {
  console.log('这是没用的');
}