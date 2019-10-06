import $ from 'jquery';
import { randomNumber } from '../helpers/random';
import { winningNumber } from './promises';


let winningColor = "";
export const setWinningColor = function(numbers){
    for (const item of numbers) {
        if (item.number === winningNumber) {
          winningColor = item.color;
        }
    }
    winningColor = winningColor.charAt(0).toUpperCase() + winningColor.substring(1) + "s";
    return winningColor;
}