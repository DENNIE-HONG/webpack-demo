import './send.scss';
const POST_URL = '/api/send';
import { tip } from 'coms/alertTip';
$(function () {
  $('.btn').on('click', async function () {
    try {
      let formData = $('form').serializeArray(),
        sendData = {};
      for (let item of formData) {
        sendData[item.name] = item.value;
      }
      let response = await postEvent(POST_URL, sendData);
      response && tip('发送成功');
    } catch (err) {
      tip(err);
    }
  });
  function postEvent (url, data) {
    return new Promise(function (resolve, reject) {
      $.post(url, data).done( function (res) {
        if (res.code === 200) {
          resolve(true);
        } else {
          reject(res.msg);
        }
      }).fail(()=> {
        reject('请求失败');
      });
    });
  }
});