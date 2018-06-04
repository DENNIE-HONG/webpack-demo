require('coms/commons');
import './home.scss';
import { tip } from 'coms/alertTip';
require('../../lib/jquery.bxslider');
// import '../../components/bxslider/jquery.bxslider.css';
tip('这是有用的');

$(document).ready(function () {
  $('.bxslider').bxSlider({
    pager: false,
    auto: true
  });
});