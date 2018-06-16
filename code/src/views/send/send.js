import './send.scss';
const POST_URL = '/api/send';
const JSONP_URL = '/api/send-jsonp';
import { tip } from 'coms/alertTip';
$(function () {
  //测试普通请求
  $('[data-action="send-post"]').on('click', async function () {
    try {
      let sendData = serializeFormData($('#send'));
      let reg = /[u4E00-u9FA5]/g;
      if (!reg.test(sendData.name)) {
        tip('不支持中文名字');
        return;
      }
      let response = await postEvent(POST_URL, sendData);
      response && tip('发送成功');
    } catch (err) {
      tip(err);
    }
  });
  $('[data-action="send-address"]').on('click', function () {
    let sendData = serializeFormData($('.sendjsonp'));
    $.ajax({
      url: JSONP_URL,
      data: sendData,
      cache: false,
      dataType: 'jsonp'
    }).done((res)=> {
      if (res.code === 200) {
        tip('发送成功');
      } else {
        tip(res.msg);
      }
    }).fail(()=>{
      tip('发送失败');
    });


  });
  //跨域请求测试
  /**
   * 将form数据转化为对象
   * @param {$form}
   * @return {Object}
  */
  function serializeFormData ($form) {
    let formData = $form.serializeArray(),
      sendData = {};
    for (let item of formData) {
      sendData[item.name] = item.value;
    }
    return sendData;
  }
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