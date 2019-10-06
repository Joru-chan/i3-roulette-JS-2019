import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getWinningNumber, balance } from './app/functions/promises';
import draggable from 'jquery-ui/ui/widgets/draggable';
import droppable from 'jquery-ui/ui/widgets/droppable';
import { createRouletteTable, createChips } from './app/functions/creation';
import { numbers } from './app/data/numbers';
import { dragChips, dropChips } from './app/functions/dragndrop';
import { ifToto, ifNotInteger, ifNegNumber, setRestart, ifOverAThousand } from './app/functions/setters';

if (!$.isNumeric(balance.current) || balance.current.search(/\./) !== -1 ){
  console.log(balance.current.search(/\./));
  debugger;
  $(".game").empty().append(ifNotInteger)
  if(balance.current == "toto"){
    $(".game").empty().append(ifToto)
  }
  setRestart();
} else {
  if(balance.current < 0){
    $(".game").empty().append(ifNegNumber);  
    setRestart();
  }
  if(balance.current > 1000){
    $(".game").empty().append(ifOverAThousand);  
    setRestart();
  }
  if(balance.current === "0"){
    alert("Oh tu n'as pas un rond... Tiens, on t'offre le premier jeton 🤑");
    balance.current++;
  }
  createChips(balance.current);
}

$(".game").css("display", "flex");
$('.balance > h2').text(`BALANCE : ${balance.current}`);
$(".lastBet").hide();
createRouletteTable(numbers, $('.numbers'));

dragChips();
dropChips();

$('.roulette > img').on('click', function () {
  $(this).toggleClass('rotated');
  $('.number').removeClass('winning');
  getWinningNumber(3000);
});

