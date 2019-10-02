import $ from 'jquery';
import { balance, getWinningNumber, winningNumber, winningColor, valeursMisees  } from './app/functions/promises';
import draggable from 'jquery-ui/ui/widgets/draggable';
import droppable from 'jquery-ui/ui/widgets/droppable';
import { createRouletteTable, createChips } from './app/functions/creation';
import { numbers } from './app/data/numbers';
import { dragChips, dropChips, jetonValeur } from './app/functions/dragndrop';

$('.balance > h2').text(`BALANCE : ${balance}`);

createRouletteTable(numbers, $('.numbers'));
createChips(balance, $('.boite-a-jetons'));


dragChips();
dropChips();
$('.number, .odd, .reds, .blacks, .even').on("drop", balance);

$('.roulette').on('click', function() {
  $(this).toggleClass('rotated');
  $(".number").removeClass("winning");
  getWinningNumber(3000);
  console.log(valeursMisees);
});

