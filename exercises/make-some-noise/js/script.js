/**
 * Make some cart noise
 * André Neder
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";


let gear = [`N`,`1`,`2`,`3`,`4`,`5`,`R`]
let transmission;

/**
 * Description of preload
*/
function preload() {
    
}


/**
 * Description of setup
*/
function setup() {
    createCanvas(1200,800);
    
    transmission = new Transmission(width-300,height-350);

}


/**
 * Description of draw()
*/
function draw() {
    background(200);

    transmission.display();

}