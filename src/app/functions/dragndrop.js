import $ from 'jquery';
import drop from 'jquery-ui/ui/widgets/droppable';
import drag from 'jquery-ui/ui/widgets/draggable';
import {
  balance, valeursMisees,
} from './promises';
import { randomNumber } from '../helpers/random';


export let jetonValeur = 0;


export const dragChips = function () {
  $('.jeton').draggable({
    drag() { jetonValeur = parseInt($(this).attr('id'), 10);
    $(this).addClass("dragged"); 
    },
  });
};

let target = { current : ""};
export let listIds = [];

export const dropChips = function () {
  $('.number, .odd, .reds, .blacks, .even').droppable({
    drop(event, ui) {
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
      listIds.push(ui.draggable[0].id);
      if ($(this).hasClass(ui.draggable[0].id)){
        console.log("déjà misé");
      } else {
        $(this).addClass(`valeurMisee ${ui.draggable[0].id}`);
        valeursMisees.push({ numero: $(this).attr('id'), jeton: jetonValeur});
        p.prepend(`${jetonValeur} on `);
        p.appendTo(bets);
        balance.current -= jetonValeur;
        $('.balance > h2').text(`BALANCE : ${balance.current}`);
        target.current = event.target;
      }
      
    },
    out: function(event, ui){
      if($(this).hasClass("valeurMisee")){
        if(target.current === event.target){
          target.current = "";
          $(this).removeClass(`valeurMisee ${ui.draggable[0].id}`);
          balance.current += jetonValeur;
          $('.balance > h2').text(`BALANCE : ${balance.current}`);
        };
      }        
    }
  });
};
