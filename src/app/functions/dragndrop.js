import $ from "jquery";
import { valeursMisees  } from './promises';
import drop from "jquery-ui/ui/widgets/droppable";
import drag from "jquery-ui/ui/widgets/draggable";

export let jetonValeur = 0;
export let newValeur;

export const dragChips = function(){
    $('.jeton').draggable({
        drag() { jetonValeur = parseInt($(this).attr('id'), 10); },
    });
}


export const dropChips = function(){
    $('.number, .odd, .reds, .blacks, .even').droppable({
    drop:function(amount) {
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
      
      newValeur = amount - jetonValeur;
      $('.balance > h2').text(`BALANCE : ${newValeur}`);
    },
  });
}