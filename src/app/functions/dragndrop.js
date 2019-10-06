import $ from 'jquery';
import drop from 'jquery-ui/ui/widgets/droppable';
import drag from 'jquery-ui/ui/widgets/draggable';
import {
  balance, valeursMisees,
} from './promises';
import { createBetText } from './creation';

export let jetonValeur = 0;
export let listIds = [];
let target = { current : ""};
let amountBet = jetonValeur;
const amountBetData = [{case : 999, amount : 0}];

export const dragChips = function () {
  $('.jeton').draggable({
    drag() { jetonValeur = parseInt($(this).attr('id'), 10);
      $(this).addClass("dragged"); 
    },
  });
};

export const dropChips = function () {
  $('.number, .odd, .reds, .blacks, .even').droppable({
    drop(event, ui) {
      const p = $("<p class='bet'></p>");
      const bets = $('.bets');
      
      if ($(this).hasClass(ui.draggable[0].id)){
        console.log("déjà misé");
      } else {
        listIds.push(ui.draggable[0].id);
        $(this).addClass(`valeurMisee ${ui.draggable[0].id}`);
        valeursMisees.push({ numero: $(this).attr('id'), jeton: jetonValeur});
        if ($("p").hasClass(event.target.id.toString())){
          for (const data of amountBetData){
            if (data.case === event.target.id){
              data.amount += jetonValeur;
              createBetText(event.target.id, data.amount);
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
              createBetText(event.target.id, data.amount);
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
        valeursMisees.splice({ numero: $(this).attr('id'), jeton: jetonValeur},1);
        balance.current += jetonValeur;
        for (const data of amountBetData ){
          if (data.case === event.target.id){
            if (data.amount-jetonValeur === 0){
              $(`.${event.target.id}`).remove();
              data.amount -= jetonValeur;
            } else{
              data.amount -= jetonValeur;
              createBetText(event.target.id, data.amount);
            }
          }
        }
        $('.balance > h2').text(`BALANCE : ${balance.current}`);
        listIds.splice(ui.draggable[0].id, 1);}
      }
  });
};
