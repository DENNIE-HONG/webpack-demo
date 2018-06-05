require('coms/commons');
import './home.scss';
import { tip } from 'coms/alertTip';
require('../../lib/jquery.bxslider');

tip('这是有用的');

$(document).ready(function () {
  $('.bxslider').bxSlider({
    pager: false,
    auto: true
  });
});