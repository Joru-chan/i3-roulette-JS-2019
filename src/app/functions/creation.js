import $ from 'jquery';
import { randomNumber } from '../helpers/random';



export const createRouletteTable = function (array, whereTo) {
  array.forEach((e) => {
    const div = $('<div></div>');
    div.append(e.number);
    div.addClass('number');
    div.addClass(e.color);
    div.attr('id', e.number);
    div.attr('data-type', 'number');
    div.css('background-color', e.color);
    whereTo.append(div);
  });
};

let top100 = -3;
let top50 = -3;
let top10 = -3;
let top5 = -3;
let top1 = -3;

export const createChips = function (nombre, whereTo) {
  let amount = nombre;
  while (amount > 0) {
    const jeton = $('<div class="jeton"></div>');
    
    if (amount >= 100) {
      if($(".jeton100").length > 0){
        jeton.css({"top" : top100 + "px", "left" : randomNumber(-5,5) + 160 + "px"})
        top100 -= 3;
      }
      jeton.addClass('jeton100').attr('id', '100j');
      amount -= 100;
    } else if (amount >= 50) {
      if($(".jeton50").length > 0){
        jeton.css({"top" : top50 + "px", "left" : randomNumber(-5,5) + 120 + "px"})
        top50 -= 3;
      }
      jeton.addClass('jeton50').attr('id', '50j');
      amount -= 50;
    } else if (amount >= 10) {
      if($(".jeton10").length > 0){
        jeton.css({"top" : top10 + "px", "left" : randomNumber(-5,5) + 80 + "px"})
        top10 -= 3;
      }
      jeton.addClass('jeton10').attr('id', '10j');
      amount -= 10;
    } else if (amount >= 5) {
      if($(".jeton5").length > 0){
        jeton.css({"top" : top5 + "px", "left" : randomNumber(-5,5) + 40 + "px"})
        top5 -= 3;
      }
      jeton.addClass('jeton5').attr('id', '5j');
      amount -= 5;
    } else if (amount >= 1) {
      if($(".jeton1").length > 0){
        jeton.css({"top" : top1 + "px", "left" : randomNumber(-5,5) + "px"})
        top1 -= 3;
      }
      jeton.addClass('jeton1').attr('id', '1j');
      amount -= 1;
    } else {
      jeton.text('Plus de jetons.');
    }
    whereTo.append(jeton);
  }
};
