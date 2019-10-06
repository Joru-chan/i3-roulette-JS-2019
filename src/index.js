import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import draggable from 'jquery-ui/ui/widgets/draggable';
import droppable from 'jquery-ui/ui/widgets/droppable';
import { balance, getWinningNumber } from './app/functions/promises';
import { createRouletteTable, createChips } from './app/functions/creation';
import { numbers } from './app/data/numbers';
import { dragChips, dropChips } from './app/functions/dragndrop';

$('.balance > h2').text(`BALANCE : ${balance.current}`);
$(".lastBet").hide();
createRouletteTable(numbers, $('.numbers'));
createChips(balance.current);
dragChips();
dropChips();

$('.roulette > img').on('click', function () {
  $(this).toggleClass('rotated');
  $('.number').removeClass('winning');
  getWinningNumber(3000);
});

