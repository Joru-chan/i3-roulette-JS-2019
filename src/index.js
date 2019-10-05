import $ from 'jquery';
import draggable from 'jquery-ui/ui/widgets/draggable';
import droppable from 'jquery-ui/ui/widgets/droppable';
import {
  balance, getWinningNumber, winningNumber, winningColor, valeursMisees,
} from './app/functions/promises';
import { createRouletteTable, createChips, distributeChips, jetonValues } from './app/functions/creation';
import { numbers } from './app/data/numbers';
import { dragChips, jetonValeur, dropChips } from './app/functions/dragndrop';



$('.balance > h2').text(`BALANCE : ${balance.current}`);

createRouletteTable(numbers, $('.numbers'));
createChips(balance.current);
dragChips();
dropChips();
$(".valeurMisee").droppable({
  out: function(){
    balance.current += jetonValeur;
  }
})



// $( '.number, .odd, .reds, .blacks, .even' ).on( "dropout", function( event, ui ) {
//   balance.current += jetonValeur;
// } );

$('.roulette > img').on('click', function () {
  $(this).toggleClass('rotated');
  $('.number').removeClass('winning');
  getWinningNumber(3000);
});
