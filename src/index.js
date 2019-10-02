import $ from 'jquery';
import draggable from 'jquery-ui/ui/widgets/draggable';
import droppable from 'jquery-ui/ui/widgets/droppable';
import { createRouletteTable, createChips } from './app/functions/creation';
import { numbers } from './app/data/numbers';
import { randomNumber } from './app/helpers/random';

let winningNumber = '';
let jetonValeur = 0;
const valeursMisees = [];
let balance = 256;
let winningColor = '';

createRouletteTable(numbers, $('.numbers'));
createChips(balance, $('.boite-a-jetons'));

$('.jeton').draggable({
  drag() { jetonValeur = parseInt($(this).attr('id'), 10); },
});

$('.number, .odd, .reds, .blacks, .even').droppable({
  drop(event, ui) {
    $(this)
      .addClass('current-bet');
    const p = $("<p class='bet'></p>");
    const bets = $('.bets');
    const dataType = $(this).attr('data-type');

    switch (dataType) {
      case 'oddeven':
        p.text($(this).hasClass('odd') ? 'Odd' : 'Even');
        break;
      case 'color':
        p.text($(this).hasClass('reds') ? 'Reds' : 'Blacks');
        break;
      case 'number':
        if ($(this).hasClass('green')) {
          p.text($(this).attr('id'));
        } else if ($(this).hasClass('red')) {
          p.text(`${$(this).attr('id')} Red`);
        } else {
          p.text(`${$(this).attr('id')} Black`);
        }
        break;

      default:
        p.text('Toto');
        break;
    }
    valeursMisees.push({ numero: $(this).attr('id'), jeton: jetonValeur });
    p.prepend(`${jetonValeur} on `);
    p.appendTo(bets);
    balance -= jetonValeur;
    $('.balance > h2').text(`BALANCE : ${balance}`);
  },
});


$('.roulette').on('click', function () {
  $(this).toggleClass('rotated');
  setTimeout(() => {
    winningNumber = randomNumber(0, 36);
    $(this).removeClass('rotated');
    for (const item of numbers) {
      if (item.number === winningNumber) {
        winningColor = item.color;
      }
    }
    for (const valeurMisee of valeursMisees) {
      if (valeurMisee.numero === winningNumber.toString()) {
        console.log('YAY');
      }
      if (valeurMisee.numero === winningColor) {
        console.log('bonne couleur');
      }
    }
  }, 3000);
});
