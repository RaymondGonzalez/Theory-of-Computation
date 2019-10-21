/*
Author: Raymond Gonzalez
Email: rayraygking@csu.fullerton.edu
File Name: Cella-Rule-150.js
Purpose: Provide functions that draw grid, generate Cella rule 150, 
function that emulates TM, and functions to change delay timer.
*/
//global variables so functions can access it
	var head1_x = 2;
	var head1_y = 0;
	var head2_x = 0;
	var head2_y = 0;
	var timer = 2000;
	var state = 0;
	var cella_array = Create2DArray(44,21);
//function that draws the second grid - the TM states
function draw_grid2( rctx, rminor, rmajor, rstroke, rfill  ) 
{
    rctx.save( );
    rctx.strokeStyle = rstroke;
    rctx.fillStyle = rfill;
    let width = rctx.canvas.width;
    let height = rctx.canvas.height;
    for ( var ix = 0; ix < width; ix += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( ix, 0 );
        rctx.lineTo( ix, height );
        rctx.lineWidth = ( ix % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
    }
    for ( var iy = 0; iy < height; iy += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( 0, iy );
        rctx.lineTo( width, iy );
        rctx.lineWidth = ( iy % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
    }
    rctx.restore( );
}
//function that adds the numbers within the grid
function fill_grid_2(rctx)
{
	rctx.font = "30px Arial";
	rctx.fillStyle = "black";
	//starting px
	var y = 30;
	var x = 10;
	//loop to display numbers
	for(var counter = 1 ; counter < 30; counter += 1)
		{
			if(counter == 10)
			{
				x = 365;
			}
			rctx.fillText(counter,x,y);
			x += 40;
			if(counter % 10 == 0)
				{
					y += 40;
					x = 5;
				}
		}
}
//function to draw grid 1 (the actual Cella grid)
function draw_grid_1( rctx, rminor, rmajor, rstroke, rfill  ) 
{
    rctx.save( );
    rctx.strokeStyle = rstroke;
    rctx.fillStyle = rfill;
    let width = rctx.canvas.width;
    let height = rctx.canvas.height;
    for ( var ix = 0; ix < width; ix += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( ix, 0 );
        rctx.lineTo( ix, height );
        rctx.lineWidth = ( ix % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
        //if ( ix % rmajor == 0 ) { rctx.fillText( ix, ix, 10 ); }
    }
    for ( var iy = 0; iy < height; iy += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( 0, iy );
        rctx.lineTo( width, iy );
        rctx.lineWidth = ( iy % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
        //if ( iy % rmajor == 0 ) {rctx.fillText( iy, 0, iy + 10 );}
    }
	//fill in the top left 200 cell (for setup)
	rctx.fillStyle = "black";
	rctx.fillRect(210,0,10,10);
    rctx.restore( );
}
//fill in the 0 and $, in the Cella Grid
function fill_grid_1(rctx)
{
	rctx.font = "10px Arial";
	var x = 2;
	var y = 10;
	for(var i = 1; i < 22 ; i+=1)
		{
			rctx.fillText("$",2,y);
			rctx.fillText("0",12,y);
			rctx.fillText("0",422,y);
			if(i == 20)
				{
					rctx.fillText("$$",429,y);
				}
			else
				{
					rctx.fillText("$",432,y);
				}
			y += 10;
		}
	
}
//create a 2D Array given dimensions
function Create2DArray(columns,rows) {
  var gridArray = [];
	//create the array and fill them with zeros(white state)
  for (var y=0;y<rows;y++) {
      gridArray[y] = [];
	  for(var x=0;x<columns;x++)
		  {
			  gridArray[y][x] = 0;
		  }
  }
  return gridArray;
}
//the function the starts the generation
function start_cella_150(ctx1,ctx2)
{
	//fill the seed
	cella_array[0][21]= 1;
	//fill the $ signs and $$ in the cella array
	for(var y = 0; y < 21; y=y+1)
		{
			cella_array[y][0] = "$";
			cella_array[y][43] = "$";
		}
	cella_array[19][43] = "$$";
	//start the TM
	Tm(ctx1,ctx2);
}
//function that manages the tm states
function Tm(ctx1, ctx2)
{	
	switch(state)
		{
			case 0:
				//display begining header position
				fillcell_orange(ctx1,0,2,1);
				fillcell_orange(ctx2,0,0,2);
				state = 1;
				break;
			case 1:
				//change the color of current header position to white or black
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				//move header position on cella grid
				head1_x = head1_x - 1;
				//move header postiion on state grid
				head2_x = head2_x + 1;
				//display new headers postions in orange
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 2;
				break;
			case 2:
				//same comment structure for cases 2-4
				//change the color of current header position to white or black
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				if(cella_array[head1_y][head1_x]== 0)
					{
						//move header position on cella grid
						head1_x = head1_x + 1;
						//move header postiion on state grid
						head2_x = head2_x + 1;
						//display new headers postions in orange
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 3;
						break;
					}
				else
					{
						//move header position on cella grid
						head1_x = head1_x + 1;
						//move header postiion on state grid
						head2_x = head2_x + 2;
						//display new headers postions in orange
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 4;
						break;
					}
			case 3:
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				if(cella_array[head1_y][head1_x]== 0)
					{
						head1_x = head1_x + 1;
						head2_x = head2_x + 2;
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 5;
						break;
					}
				else
					{
						head1_x = head1_x + 1;
						head2_x = head2_x + 3;
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 6;
						break;
					}
			case 4:
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				if(cella_array[head1_y][head1_x]== 0)
					{
						head1_x = head1_x + 1;
						head2_x = head2_x + 3;
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 7;
						break;
					}
				else
					{
						head1_x = head1_x + 1;
						head2_x = head2_x + 4;
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 8;
						break;
					}
			case 5:
				//change the color of current header position to white or black
				if(cella_array[head1_y][head1_x]==0 || cella_array[head1_y][head1_x]== "$"
				 || cella_array[head1_y][head1_x]== "$$" )
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				if(cella_array[head1_y][head1_x]== "$")
					{
						//move header position on cella grid
						head1_y = head1_y + 1;
						//move header postiion on state grid
						head2_x = head2_x + 1;
						head2_y = head2_y + 2;
						//display new headers postions in orange
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 26;
						break;
					}
				else if(cella_array[head1_y][head1_x]== "$$")
					{
						//move header postiion on state grid
						head2_x = head2_x + 4;
						head2_y = head2_y + 2;
						//display new headers postions in orange
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 29;
						break;
					}
				else if(cella_array[head1_y][head1_x]== 0)
					{
						//move header position on cella grid
						head1_x = head1_x - 1;
						//move header postiion on state grid
						head2_x = head2_x + 4;
						//display new headers postions in orange
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 9;
						break;
					}
				else
					{
						//move header position on cella grid
						head1_x = head1_x - 1;
						//move header postiion on state grid
						head2_x = head2_x + 5;
						//display new headers postions in orange
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 10;
						break;
					}
			case 6:
				if(cella_array[head1_y][head1_x]==0 || cella_array[head1_y][head1_x]== "$"|| cella_array[head1_y][head1_x]== "$$" )
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				if(cella_array[head1_y][head1_x]== "$")
					{
						head1_y = head1_y + 1;
						head2_y = head2_y + 2;
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 26;
						break;
					}
				if(cella_array[head1_y][head1_x]== "$$")
					{
						head2_x = head2_x + 3;
						head2_y = head2_y + 2;
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 29;
						break;
					}
				if(cella_array[head1_y][head1_x]== 0)
					{
						head1_x = head1_x - 1;
						head2_x = head2_x - 5;
						head2_y = head2_y + 1;
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 11;
						break;
					}
				else
					{
						head1_x = head1_x - 1;
						head2_x = head2_x - 4;
						head2_y = head2_y + 1;
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 12;
						break;
					}
			case 7:
				if(cella_array[head1_y][head1_x]==0 || cella_array[head1_y][head1_x]== "$"|| cella_array[head1_y][head1_x]== "$$" )
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				if(cella_array[head1_y][head1_x]== "$")
					{
						head1_y = head1_y + 1;
						head2_y = head2_y + 2;
						head2_x = head2_x - 1;
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 26;
						break;
					}
				if(cella_array[head1_y][head1_x]== "$$")
					{
						head2_x = head2_x + 2;
						head2_y = head2_y + 2;
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 29;
						break;
					}
				if(cella_array[head1_y][head1_x]== 0)
					{
						head1_x = head1_x - 1;
						head2_x = head2_x - 4;
						head2_y = head2_y + 1;
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 13;
						break;
					}
				else
					{
						head1_x = head1_x - 1;
						head2_x = head2_x - 3;
						head2_y = head2_y + 1;
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 14;
						break;
					}
			case 8:
				if(cella_array[head1_y][head1_x]==0 || cella_array[head1_y][head1_x]== "$" || cella_array[head1_y][head1_x]== "$$" )
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				if(cella_array[head1_y][head1_x]== "$")
					{
						head1_y = head1_y + 1;
						head2_y = head2_y + 2;
						head2_x = head2_x - 2;
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 26;
						break;
					}
				if(cella_array[head1_y][head1_x]== "$$")
					{
						head2_x = head2_x + 1;
						head2_y = head2_y + 2;
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 29;
						break;
					}
				if(cella_array[head1_y][head1_x]== 0)
					{
						head1_x = head1_x - 1;
						head2_x = head2_x - 3;
						head2_y = head2_y + 1;
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 15;
						break;
					}
				else
					{
						head1_x = head1_x - 1;
						head2_x = head2_x - 2;
						head2_y = head2_y + 1;
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 16;
						break;
					}
			case 9: 
				//change the color of current header position to white or black
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				//move header position on cella grid
				head1_y = head1_y + 1;
				//move header position on state grid
				head2_x = head2_x - 2;
				head2_y = head2_y + 1;
				//display new headers postions in orange
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 17;
				break;
			case 10: 
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				head1_y = head1_y + 1;
				head2_x = head2_x - 2;
				head2_y = head2_y + 1;
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 18;
				break;
			case 11: 
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				head1_y = head1_y + 1;
				head2_x = head2_x + 8;
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 19;
				break;
			case 12: 
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				head1_y = head1_y + 1;
				head2_x = head2_x - 2;
				head2_y = head2_y + 1;
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 20;
				break;
			case 13: 
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				head1_y = head1_y + 1;
				head2_x = head2_x - 2;
				head2_y = head2_y + 1;
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 21;
				break;
			case 14: 
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				head1_y = head1_y + 1;
				head2_x = head2_x - 2;
				head2_y = head2_y + 1;
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 22;
				break;
			case 15: 
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				head1_y = head1_y + 1;
				head2_x = head2_x - 2;
				head2_y = head2_y + 1;
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 23;
				break;
			case 16: 
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				head1_y = head1_y + 1;
				head2_x = head2_x - 2;
				head2_y = head2_y + 1;
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 24;
				break;
			case 17: 
				//change the color of current header position to white or black
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				//move header position on cella grid
				head1_y = head1_y - 1;
				//move header position on state grid
				head2_x = head2_x - 2;
				head2_y = head2_y + 1;
				//display new headers postions in orange
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 25;
				break;
			case 18: 
				cella_array[head1_y][head1_x] = 1;
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				head1_y = head1_y - 1;
				head2_x = head2_x - 3;
				head2_y = head2_y + 1;
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 25;
				break;
			case 19: 
				cella_array[head1_y][head1_x]=1;
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				head1_y = head1_y - 1;
				head2_x = head2_x - 4;
				head2_y = head2_y + 1;
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 25;
				break;
			case 20: 
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				head1_y = head1_y - 1;
				head2_x = head2_x + 5;
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 25;
				break;
			case 21: 
				cella_array[head1_y][head1_x]=1;
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				head1_y = head1_y - 1;
				head2_x = head2_x + 4;
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 25;
				break;
			case 22: 
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				head1_y = head1_y - 1;
				head2_x = head2_x + 3;
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 25;
				break;
			case 23: 
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				head1_y = head1_y - 1;
				head2_x = head2_x + 2;
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 25;
				break;
			case 24: 
				cella_array[head1_y][head1_x]=1;
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				head1_y = head1_y - 1;
				head2_x = head2_x + 1;
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 25;
				break;
			case 25: 
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				head1_x = head1_x + 1;
				head2_x = head2_x - 4;
				head2_y = head2_y - 2;
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 1;
				break;
			case 26: 
				if(cella_array[head1_y][head1_x]==0 || cella_array[head1_y][head1_x]== "$" || cella_array[head1_y][head1_x]== "$$")
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				head1_x = head1_x - 1;
				head2_x = head2_x + 1;
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 27;
				break;
			case 27: 
				//change the color of current header position to white or black
				if(cella_array[head1_y][head1_x]==0 || cella_array[head1_y][head1_x]== "$" || cella_array[head1_y][head1_x]== "$$")
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
					if(cella_array[head1_y][head1_x] == "$")
						{
							//move header position on cella grid
							head1_x = head1_x + 1;
							//move header position on state grid
							head2_x = head2_x + 1;
							//display new headers postions in orange
							fillcell_orange(ctx1, head1_y, head1_x, 1);
							fillcell_orange(ctx2, head2_y, head2_x, 2);
							state = 28;
							break;
						}
				//move header position on cella grid
				head1_x = head1_x - 1;
				//display new headers postions in orange
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 27;
				break;
			case 28: 
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				head1_x = head1_x + 1;
				head2_x = head2_x - 7;
				head2_y = head2_y - 2;
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 1;
				break;
			case 29: 
				//end state
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				state = 29;
				break;
			
		}
	//delay the next tm call
	if(state != 29)
		{ setTimeout(Tm,timer,ctx1,ctx2)}
}
//fill a square with black given an xCord and ycord
function fillcell_black(rctx, yCord, xCord)
{
	rctx.fillStyle = "black"
	//formulas to fill in the correct square
	var x = (xCord)*10;
	var y = yCord*10;
	rctx.fillRect(x,y,10,10);
}

//fill a square with white given an xCord and ycord
function fillcell_white(rctx, yCord, xCord, grid , number)
{
	rctx.fillStyle = "white"
	//for cella grid
	if(grid == 1)
		{
			//formulas to fill in the correct square
			var x = (xCord)*10;
			var y = yCord*10;
			rctx.fillRect(x,y,10,10);
			rctx.fillStyle = "black";
			rctx.strokeRect(x,y,10,10);
			if(xCord == 1)
				{
					rctx.font = "10px Arial";
					rctx.fillText("0",12,10+10*yCord)
					
				}
			else if(xCord == 42)
				{
					rctx.font = "10px Arial";
					rctx.fillText("0",422,10+10*yCord)
				}
			else if(xCord == 0)
				{
					rctx.font = "10px Arial";
					rctx.fillText("$",2,10+10*yCord)
				}
			else if (xCord == 43 && yCord !=19)
				{
					rctx.font = "10px Arial";
					rctx.fillText("$",432,10+10*yCord)
				}
			else if (xCord == 43)
				{
					rctx.font = "10px Arial";
					rctx.fillText("$$",429,10+10*yCord)
				}
		}
	//for state grid
	else
		{
			if(number < 10)
				{
					//formulas to fill in the correct square
					var x = (xCord)*40;
					var y = yCord*40;
					rctx.fillRect(x,y,40,40);
					rctx.font = "30px Arial";
					rctx.fillStyle = "black";
					rctx.strokeRect(x,y,40,40);
					//adding 40 to each one
					var y = 30+40*yCord;
					var x = 10+40*xCord;
					rctx.fillText(number,x,y);
				}
			else
			{
				//formulas to fill in the correct square
				var x = (xCord)*40;
				var y = yCord*40;
				rctx.fillRect(x,y,40,40);
				rctx.font = "30px Arial";
				rctx.fillStyle = "black";
				rctx.strokeRect(x,y,40,40);
				//adding 40 to each one
				var y = 30+40*yCord;
				var x = 5+40*xCord;
				rctx.fillText(number,x,y);
			}
		}
}
//fill a square with orange given an xCord and ycord
function fillcell_orange(rctx, yCord, xCord, grid)
{
	//for cella grid
	if(grid == 1)
		{
			rctx.fillStyle = "orange"
			//formulas to fill in the correct square
			var x = (xCord)*10;
			var y = yCord*10;
			rctx.fillRect(x,y,10,10);
		}
	//for state grid
	else
		{
			rctx.fillStyle = "orange"
			//formulas to fill in the correct square
			var x = (xCord)*40;
			var y = yCord*40;
			rctx.fillRect(x,y,40,40);
		}
}
//function timers to change the delay
function set_timer_1ms()
{
	timer = 1;
}
function set_timer_500ms()
{
	timer = 500;
}
function set_timer_100ms()
{
	timer = 100;
}
function set_timer_1s()
{
	timer = 1000;
}
