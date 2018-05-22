require('../../components/commons');
import './home.scss';
import { tip } from '../../components/alertTip';
require('../../components/bxslider/jquery.bxslider');
// import '../../components/bxslider/jquery.bxslider.css';
tip('这是有用的');

$(document).ready(function(){
  $('.bxslider').bxSlider({
    pager: false,
    auto: true
  });
});