import $ from 'jquery';
import { randomNumber } from '../helpers/random';
import { numbers } from '../data/numbers';
import { createChips, showToast } from './creation';
import { dragChips, listIds } from './dragndrop';
import { setWinningColor } from './setters';

export const balance = { current: prompt("💵 Avec quel montant souhaitez vous commencer ? 💵") };
export let winningNumber = '';
let winningColor = "";

export let valeursMisees = [];

export const getWinningNumber = function (time) {
  const timeOut = new Promise((resolve, reject) => {
    setTimeout(() => {
      if ($('.number').hasClass('winning')) {
        throw new Error(['Only one number can be picked by the magical roulette!']);
      }
      resolve(randomNumber(0, 36));
    }, time);
  });

  timeOut.then((number) => {
    winningNumber = number;
    $('.roulette > img').removeClass('rotated');
    for (const div of $('.number')) {
      if (parseInt($(div).attr('id'), 10) === winningNumber) {
        $(div).addClass('winning');
      }
    }
    winningColor = setWinningColor(numbers);
    for (const valeurMisee of valeursMisees) {
      let gains = 0;
      if (valeurMisee.numero === winningNumber.toString()) {
        gains = valeurMisee.jeton * 35;
        balance.current += gains;
        showToast();
      } 
      if (valeurMisee.numero == winningColor) {
        gains = valeurMisee.jeton * 2;
        balance.current += gains;
        showToast();
      }
      if (valeurMisee.numero === (winningNumber % 2 === 0).toString()){
        gains = valeurMisee.jeton * 2;
        balance.current += gains;
        showToast();
      }
      $('.balance > h2').text(`BALANCE : ${balance.current}`);
    }
  }).then(() => {
    $('.boite-a-jetons').empty();
    for( const id of listIds ){
      if($(".valeurMisee").hasClass(id)){
        $(".valeurMisee").removeClass(id); 
      }
    } 
    $(".valeurMisee").removeClass("valeurMisee");
    for( const bet of $(".bet") ){
      $(".lastBet").show();
      $(`.lastBet`).append("<p>" + $(bet).text() + "</p>");
      $(bet).remove();
    }
    if(valeursMisees.length !== 0){
      $(".lastBet").append("<div class='separator'></div>");
    }
    valeursMisees = [];
    createChips(balance.current);
    dragChips();
    if(balance.current === 0){
      $(".game").empty().append("<div class='perdu'><p>Vous avez perdu :(</p><button class='btn btn-success restart'>Rejouer?</button><img src='assets/images/loss.gif' /></div>")
      $(".restart").on("click", function(){
        location.href=location.href;
      });
    }
  }).catch((error) => console.log(error));
};
