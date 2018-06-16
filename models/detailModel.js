const axios = require('axios');
const detailList = () => {
  return axios.get('https://www.jianshu.com/notes/9739254/included_collections?page=1');
};
module.exports = {
  detailList
}