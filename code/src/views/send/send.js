import './send.scss';
const POST_URL = '/api/send';
$(async function () {
  try {
    $('.btn').on('click', function () {
      let formData = $('form').serializeArray(),
        sendData = {};
      for (let item of formData) {
        sendData[item.name] = item.value;
      }
      // let response = await postEvent(POST_URL, sendData);

    });
  } catch (err) {
    console.log(err);
  }
  function postEvent (url, data) {
    return new Promise(function (resolve, reject) {
      $.post(url, data).done( function (res) {
        if (res.code === 200) {
          resolove(res);
        }
      });
    });
  }
});