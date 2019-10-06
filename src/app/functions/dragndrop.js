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
let amountBet = jetonValeur;
const amountBetData = [{case : 999, amount : 0}];

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
          if (!$(this).hasClass(ui.draggable[0].id)) {
            p.text($(this).attr('id'));
          }
          break;
        default:
          p.text('Toto');
          break;
      }

      if ($(this).hasClass(ui.draggable[0].id)){
        console.log("déjà misé");
      } else {
       
        listIds.push(ui.draggable[0].id);
        $(this).addClass(`valeurMisee ${ui.draggable[0].id}`);
        valeursMisees.push({ numero: $(this).attr('id'), jeton: jetonValeur});
        
        if ($("p").hasClass(event.target.id.toString())){
          
          console.log("toto");
          // $(`.bets > .${event.target.id}`).remove();
          
          for (const data of amountBetData){
            if (data.case === event.target.id){
              data.amount += jetonValeur;
              $(`.${event.target.id}`).text(`${data.amount} on ${event.target.id}`);
            }
          }
          
          
        } else{
          amountBet = jetonValeur;
          
          for (const data of amountBetData){
            if (data.case === event.target.id){
              data.amount += jetonValeur;
            }
          }
          if (amountBetData.includes({case : event.target.id, amount : amountBet})){
            amountBet += jetonValeur;
          } else{
            amountBetData.push({case : event.target.id, amount : amountBet});
            p.addClass(event.target.id);
            p.appendTo(bets);
          }
          

          
          for (const data of amountBetData){
            if (data.case === event.target.id){
              $(`.${event.target.id}`).text(`${amountBet} on ${event.target.id}`);
            }
          }
          
        }
        
        balance.current -= jetonValeur;
        $('.balance > h2').text(`BALANCE : ${balance.current}`);
        target.current = event.target;
      }
      
    },
    out: function(event, ui){
      
      if($(this).hasClass(ui.draggable[0].id)){
        target.current = "";

        $(this).removeClass(`valeurMisee ${ui.draggable[0].id}`);
        balance.current += jetonValeur;
        
        for (const data of amountBetData ){
          if (data.case === event.target.id){
            if (data.amount-jetonValeur === 0){
              $(`.${event.target.id}`).remove();
              data.amount -= jetonValeur;
            } else{
              data.amount -= jetonValeur;
              $(`.${event.target.id}`).text(`${data.amount} on ${event.target.id}`);
            }
          }
        }
        
        
        
        
        $('.balance > h2').text(`BALANCE : ${balance.current}`);
        listIds.splice(ui.draggable[0].id, 1);}
      }
  });
};
