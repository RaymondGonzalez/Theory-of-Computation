/*
Author: Raymond Gonzalez
Email: rayraygking@csu.fullerton.edu
File Name: Tm-Conway-GOL.js
Purpose: Provide functions that draw grid, functions that manipulate grid, function that emulates GOL, and functions to change delay timer.
*/
//global variables so functions can access it
	var head1_x = 2;
	var head1_y = 1;
	var head2_x = 0;
	var head2_y = 0;
	var timer = 1;
	var state = 0;
	var GOL_array = Create2DArray(44,23);
	var inter = 0;
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
	for(var counter = 1 ; counter < 51; counter += 1)
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
    rctx.restore( );
}

//fill in the 0 and $, in the Cella Grid
function fill_grid_1(rctx)
{
	rctx.font = "10px Arial";
	var x = 2;
	var y = 10;
	for(var i = 1; i < 24 ; i+=1)
		{
			if(i == 1)
				{
					rctx.fillText("$$",0,y);
				}
			else
			{
				rctx.fillText("$",2,y);
			}
			rctx.fillText("0",12,y);
			rctx.fillText("0",422,y);
			if(i == 21)
				{
					rctx.fillText("$$",429,y);
				}
			else
				{
					rctx.fillText("$",432,y);
				}
			y += 10;
		}
	x = 22;
	for (var i = 1; i <= 40; i+=1)
		{
			rctx.fillText("0",x,10);
			rctx.fillText("0",x,230);
			x+=10;
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
	for(var y = 0; y < 23; y=y+1)
		{
			gridArray[y][0] = "$";
			gridArray[y][43] = "$";
		}	
	gridArray[20][43] = "$$";
	gridArray[0][0] = "$$";
  return gridArray;
}
//the function the setup the glider
function setup_glider(ctx1)
{
	//this is initial glider
	fillcell_blue(ctx1,10,20);
	fillcell_blue(ctx1,10,22);
	fillcell_blue(ctx1,11,21);
	fillcell_blue(ctx1,11,22);
	fillcell_blue(ctx1,12,21);
	
	GOL_array[10][20] = 1;
	GOL_array[10][22] = 1;
	GOL_array[11][21] = 1;
	GOL_array[11][22] = 1;
	GOL_array[12][21] = 1;
}
//function to set up bill object
function setup_Bill(ctx1)
{
	var x = 4
	var y = 11
	//code is based on the top left of cube
	fillcell_blue(ctx1,y,x);
	fillcell_blue(ctx1,y,x+1);
	fillcell_blue(ctx1,y+1,x);
	fillcell_blue(ctx1,y+1,x+1);
	GOL_array[y][x] = 1;
	GOL_array[y][x+1] = 1;
	GOL_array[y+1][x] = 1;
	GOL_array[y+1][x+1] = 1;
	
	fillcell_blue(ctx1,y-2,x+12);
	fillcell_blue(ctx1,y-2,x+13);
	fillcell_blue(ctx1,y-1,x+11);
	fillcell_blue(ctx1,y-1,x+15);
	fillcell_blue(ctx1,y,x+10);
	fillcell_blue(ctx1,y,x+16);
	fillcell_blue(ctx1,y+1,x+10);
	fillcell_blue(ctx1,y+1,x+14);
	fillcell_blue(ctx1,y+1,x+16);
	fillcell_blue(ctx1,y+1,x+17);
	fillcell_blue(ctx1,y+2,x+10);
	fillcell_blue(ctx1,y+2,x+16);
	fillcell_blue(ctx1,y+3,x+11);
	fillcell_blue(ctx1,y+3,x+15);
	fillcell_blue(ctx1,y+4,x+12);
	fillcell_blue(ctx1,y+4,x+13);
	GOL_array[y-2][x+12] = 1;
	GOL_array[y-2][x+13] = 1;
	GOL_array[y-1][x+11] = 1;
	GOL_array[y-1][x+15] = 1;
	GOL_array[y][x+10] = 1;
	GOL_array[y][x+16] = 1;
	GOL_array[y+1][x+10] = 1;
	GOL_array[y+1][x+14] = 1;
	GOL_array[y+1][x+16] = 1;
	GOL_array[y+1][x+17] = 1;
	GOL_array[y+2][x+10] = 1;
	GOL_array[y+2][x+16] = 1;
	GOL_array[y+3][x+11] = 1;
	GOL_array[y+3][x+15] = 1;
	GOL_array[y+4][x+12] = 1;
	GOL_array[y+4][x+13] = 1;
	
	fillcell_blue(ctx1,y-5,x+24);
	fillcell_blue(ctx1,y-4,x+24);
	fillcell_blue(ctx1,y-3,x+22);
	fillcell_blue(ctx1,y-2,x+20);
	fillcell_blue(ctx1,y-2,x+21);
	fillcell_blue(ctx1,y-1,x+20);
	fillcell_blue(ctx1,y-1,x+21);
	fillcell_blue(ctx1,y,x+20);
	fillcell_blue(ctx1,y,x+21);
	fillcell_blue(ctx1,y+1,x+22);
	fillcell_blue(ctx1,y+1,x+24);
	fillcell_blue(ctx1,y+2,x+24);
	GOL_array[y-5][x+24] = 1;
	GOL_array[y-4][x+24] = 1;
	GOL_array[y-3][x+22] = 1;
	GOL_array[y-2][x+20] = 1;
	GOL_array[y-2][x+21] = 1;
	GOL_array[y-1][x+20] = 1;
	GOL_array[y-1][x+21] = 1;
	GOL_array[y][x+20] = 1;
	GOL_array[y][x+21] = 1;
	GOL_array[y+1][x+22] = 1;
	GOL_array[y+1][x+24] = 1;
	GOL_array[y+2][x+24] = 1;
	
	fillcell_blue(ctx1,y-3,x+34);
	fillcell_blue(ctx1,y-3,x+35);
	fillcell_blue(ctx1,y-2,x+34);
	fillcell_blue(ctx1,y-2,x+35);
	GOL_array[y-3][x+34] = 1;
	GOL_array[y-3][x+35] = 1;
	GOL_array[y-2][x+34] = 1;
	GOL_array[y-2][x+35] = 1;
}
//function to setup pulser object
function setup_pulser(ctx1)
{
	//this is initial pulser
	var x = 18
	var y = 5
	fillcell_blue(ctx1,y,x);
	fillcell_blue(ctx1,y,x+1);
	fillcell_blue(ctx1,y,x+7);
	fillcell_blue(ctx1,y,x+8);
	GOL_array[y][x] = 1;
	GOL_array[y][x+1] = 1;
	GOL_array[y][x+7] = 1;
	GOL_array[y][x+8] = 1;
	
	fillcell_blue(ctx1,y+1,x+1);
	fillcell_blue(ctx1,y+1,x+2);
	fillcell_blue(ctx1,y+1,x+6);
	fillcell_blue(ctx1,y+1,x+7);
	GOL_array[y+1][x+1] = 1;
	GOL_array[y+1][x+2] = 1;
	GOL_array[y+1][x+6] = 1;
	GOL_array[y+1][x+7] = 1;
	
	fillcell_blue(ctx1,y+2,x-2);
	fillcell_blue(ctx1,y+2,x+1);
	fillcell_blue(ctx1,y+2,x+3);
	fillcell_blue(ctx1,y+2,x+5);
	fillcell_blue(ctx1,y+2,x+7);
	fillcell_blue(ctx1,y+2,x+10);
	GOL_array[y+2][x-2] = 1;
	GOL_array[y+2][x+1] = 1;
	GOL_array[y+2][x+3] = 1;
	GOL_array[y+2][x+5] = 1;
	GOL_array[y+2][x+7] = 1;
	GOL_array[y+2][x+10] = 1;
	
	fillcell_blue(ctx1,y+3,x-2);
	fillcell_blue(ctx1,y+3,x-1);
	fillcell_blue(ctx1,y+3,x);
	fillcell_blue(ctx1,y+3,x+2);
	fillcell_blue(ctx1,y+3,x+3);
	fillcell_blue(ctx1,y+3,x+5);
	fillcell_blue(ctx1,y+3,x+6);
	fillcell_blue(ctx1,y+3,x+8);
	fillcell_blue(ctx1,y+3,x+9);
	fillcell_blue(ctx1,y+3,x+10);
	GOL_array[y+3][x-2] = 1;
	GOL_array[y+3][x-1] = 1;
	GOL_array[y+3][x] = 1;
	GOL_array[y+3][x+2] = 1;
	GOL_array[y+3][x+3] = 1;
	GOL_array[y+3][x+5] = 1;
	GOL_array[y+3][x+6] = 1;
	GOL_array[y+3][x+8] = 1;
	GOL_array[y+3][x+9] = 1;
	GOL_array[y+3][x+10] = 1;
	
	fillcell_blue(ctx1,y+4,x-1);
	fillcell_blue(ctx1,y+4,x+1);
	fillcell_blue(ctx1,y+4,x+3);
	fillcell_blue(ctx1,y+4,x+5);
	fillcell_blue(ctx1,y+4,x+7);
	fillcell_blue(ctx1,y+4,x+9);
	GOL_array[y+4][x-1] = 1;
	GOL_array[y+4][x+1] = 1;
	GOL_array[y+4][x+3] = 1;
	GOL_array[y+4][x+5] = 1;
	GOL_array[y+4][x+7] = 1;
	GOL_array[y+4][x+9] = 1;
	
	fillcell_blue(ctx1,y+5,x);
	fillcell_blue(ctx1,y+5,x+1);
	fillcell_blue(ctx1,y+5,x+2);
	fillcell_blue(ctx1,y+5,x+6);
	fillcell_blue(ctx1,y+5,x+7);
	fillcell_blue(ctx1,y+5,x+8);
	GOL_array[y+5][x] = 1;
	GOL_array[y+5][x+1] = 1;
	GOL_array[y+5][x+2] = 1;
	GOL_array[y+5][x+6] = 1;
	GOL_array[y+5][x+7] = 1;
	GOL_array[y+5][x+8] = 1;
	
	fillcell_blue(ctx1,y+7,x);
	fillcell_blue(ctx1,y+7,x+1);
	fillcell_blue(ctx1,y+7,x+2);
	fillcell_blue(ctx1,y+7,x+6);
	fillcell_blue(ctx1,y+7,x+7);
	fillcell_blue(ctx1,y+7,x+8);
	GOL_array[y+7][x] = 1;
	GOL_array[y+7][x+1] = 1;
	GOL_array[y+7][x+2] = 1;
	GOL_array[y+7][x+6] = 1;
	GOL_array[y+7][x+7] = 1;
	GOL_array[y+7][x+8] = 1;
	
	fillcell_blue(ctx1,y+8,x-1);
	fillcell_blue(ctx1,y+8,x+1);
	fillcell_blue(ctx1,y+8,x+3);
	fillcell_blue(ctx1,y+8,x+5);
	fillcell_blue(ctx1,y+8,x+7);
	fillcell_blue(ctx1,y+8,x+9);
	GOL_array[y+8][x-1] = 1;
	GOL_array[y+8][x+1] = 1;
	GOL_array[y+8][x+3] = 1;
	GOL_array[y+8][x+5] = 1;
	GOL_array[y+8][x+7] = 1;
	GOL_array[y+8][x+9] = 1;
	
	fillcell_blue(ctx1,y+9,x-2);
	fillcell_blue(ctx1,y+9,x-1);
	fillcell_blue(ctx1,y+9,x);
	fillcell_blue(ctx1,y+9,x+2);
	fillcell_blue(ctx1,y+9,x+3);
	fillcell_blue(ctx1,y+9,x+5);
	fillcell_blue(ctx1,y+9,x+6);
	fillcell_blue(ctx1,y+9,x+8);
	fillcell_blue(ctx1,y+9,x+9);
	fillcell_blue(ctx1,y+9,x+10);
	GOL_array[y+9][x-2] = 1;
	GOL_array[y+9][x-1] = 1;
	GOL_array[y+9][x] = 1;
	GOL_array[y+9][x+2] = 1;
	GOL_array[y+9][x+3] = 1;
	GOL_array[y+9][x+5] = 1;
	GOL_array[y+9][x+6] = 1;
	GOL_array[y+9][x+8] = 1;
	GOL_array[y+9][x+9] = 1;
	GOL_array[y+9][x+10] = 1;
	
	fillcell_blue(ctx1,y+10,x-2);
	fillcell_blue(ctx1,y+10,x+1);
	fillcell_blue(ctx1,y+10,x+3);
	fillcell_blue(ctx1,y+10,x+5);
	fillcell_blue(ctx1,y+10,x+7);
	fillcell_blue(ctx1,y+10,x+10);
	GOL_array[y+10][x-2] = 1;
	GOL_array[y+10][x+1] = 1;
	GOL_array[y+10][x+3] = 1;
	GOL_array[y+10][x+5] = 1;
	GOL_array[y+10][x+7] = 1;
	GOL_array[y+10][x+10] = 1;
	
	fillcell_blue(ctx1,y+11,x+1);
	fillcell_blue(ctx1,y+11,x+2);
	fillcell_blue(ctx1,y+11,x+6);
	fillcell_blue(ctx1,y+11,x+7);
	GOL_array[y+11][x+1] = 1;
	GOL_array[y+11][x+2] = 1;
	GOL_array[y+11][x+6] = 1;
	GOL_array[y+11][x+7] = 1;
	
	fillcell_blue(ctx1,y+12,x);
	fillcell_blue(ctx1,y+12,x+1);
	fillcell_blue(ctx1,y+12,x+7);
	fillcell_blue(ctx1,y+12,x+8);
	GOL_array[y+12][x] = 1;
	GOL_array[y+12][x+1] = 1;
	GOL_array[y+12][x+7] = 1;
	GOL_array[y+12][x+8] = 1;
}
//function to setup spaceship
function setup_space(ctx1)
{
	var x = 22
	var y = 9
	//space ship based on top block
	fillcell_blue(ctx1,y,x);
	fillcell_blue(ctx1,y+1,x-2);
	fillcell_blue(ctx1,y+1,x+2);
	fillcell_blue(ctx1,y+2,x-3);
	fillcell_blue(ctx1,y+3,x-3);
	fillcell_blue(ctx1,y+3,x+2);
	fillcell_blue(ctx1,y+4,x-3);
	fillcell_blue(ctx1,y+4,x-2);
	fillcell_blue(ctx1,y+4,x-1);
	fillcell_blue(ctx1,y+4,x);
	fillcell_blue(ctx1,y+4,x+1);
	GOL_array[y+1][x-2] = 1;
	GOL_array[y+1][x+2] = 1;
	GOL_array[y+2][x-3] = 1;
	GOL_array[y+3][x-3] = 1;
	GOL_array[y+3][x+2] = 1;
	GOL_array[y+4][x-3] = 1;
	GOL_array[y+4][x-2] = 1;
	GOL_array[y+4][x-1] = 1;
	GOL_array[y+4][x] = 1;
	GOL_array[y+4][x+1] = 1;
}
//function that clears the grid
function clear_grid1(ctx1)
{
	for(y=0;y<23;y+=1)
		{
			for(x=0;x<44;x+=1)
				{
					GOL_array[y][x] = 0;
					fillcell_white(ctx1,y,x,1);
					if(x==43 && y==20)
						{
							GOL_array[y][x] = "$$";
						}
					else if(x==0 || x==43)
						{
							GOL_array[y][x] = "$";
						}
					else if(x==0 && y==0)
						{
							GOL_array[y][x] = "$$";
						}
				}
		}
}
//function that starts GOL
function start_GOL(ctx1,ctx2)
{
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
				fillcell_orange(ctx1,1,2,1);
				fillcell_orange(ctx2,0,0,2);
				state = 1;
				break;
			case 1:
				if(GOL_array[head1_y][head1_x] == 0 || GOL_array[head1_y][head1_x] == "D")
					{
						//this is converting any B to 1
						if(GOL_array[head1_y][head1_x] == 0 )
							{
								GOL_array[head1_y][head1_x] = 10;
							}
						else if(GOL_array[head1_y][head1_x] == "D")
							{
								GOL_array[head1_y][head1_x] = 40;
							}
						//this is blue for alive
						fillcell_white(ctx1,head1_y,head1_x,1);
						fillcell_white(ctx2,head2_y,head2_x,2);
						filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
						fill_number(ctx2,head2_y,head2_x,state);
						head1_x = head1_x - 1;
						head2_x = head2_x + 1;
						fillcell_orange(ctx1,head1_y,head1_x,1);
						fillcell_orange(ctx2,head2_y,head2_x,2);
						state = 2;
						break;
					}
				else if(GOL_array[head1_y][head1_x] == 1 || GOL_array[head1_y][head1_x] == "B")
					{
						//this is converting any B to 1
						if(GOL_array[head1_y][head1_x] == 1 )
							{
								GOL_array[head1_y][head1_x] = 30;
							}
						else if(GOL_array[head1_y][head1_x] == "B")
							{
								GOL_array[head1_y][head1_x] = 20;
							}
						//this is blue for alive
						fillcell_blue(ctx1,head1_y,head1_x);
						fillcell_white(ctx2,head2_y,head2_x,2);
						filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
						fill_number(ctx2,head2_y,head2_x,state);
						head1_x = head1_x - 1;
						head2_x = head2_x + 1;
						fillcell_orange(ctx1,head1_y,head1_x,1);
						fillcell_orange(ctx2,head2_y,head2_x,2);
						state = 2;
						break;
					}
			case 2:
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				if(GOL_array[head1_y][head1_x] == 0 || GOL_array[head1_y][head1_x] == "B")
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
						if(GOL_array[head1_y][head1_x] == "B")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
						state = 3;
						head2_x = head2_x + 1;
					}
				else if(GOL_array[head1_y][head1_x] == 1 || GOL_array[head1_y][head1_x] == "D")
					{
						fillcell_blue(ctx1,head1_y,head1_x);
						if(GOL_array[head1_y][head1_x] == "D")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
						state = 5;
						head2_x = head2_x + 3;
					}
				head1_x = head1_x + 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				break;
			case 3:
				//this one doesn't add one
				if(GOL_array[head1_y][head1_x] < 30)
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
					}
				else if(GOL_array[head1_y][head1_x] >= 30)
					{
						fillcell_blue(ctx1,head1_y,head1_x);
					}
				filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				head1_y = head1_y - 1;
				head2_x = head2_x + 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 4;
				break;
			case 4:
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				if(GOL_array[head1_y][head1_x] == 0 || GOL_array[head1_y][head1_x] == "B")
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
						if(GOL_array[head1_y][head1_x] == "B")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				else if(GOL_array[head1_y][head1_x] == 1 || GOL_array[head1_y][head1_x] == "D")
					{
						fillcell_blue(ctx1,head1_y,head1_x);
						if(GOL_array[head1_y][head1_x] == "D")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				head1_x = head1_x - 1;
				head2_x = head2_x + 2;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 6;
				break;
			case 5:
				//this one adds one
				if(GOL_array[head1_y][head1_x] < 30)
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
					}
				else if(GOL_array[head1_y][head1_x] >= 30)
					{
						fillcell_blue(ctx1,head1_y,head1_x);
					}
				//add one
				GOL_array[head1_y][head1_x] = GOL_array[head1_y][head1_x] + 1;
				filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				head1_y = head1_y - 1;
				head2_x = head2_x - 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 4;
				break;
			case 6:
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				if(GOL_array[head1_y][head1_x] == 0 || GOL_array[head1_y][head1_x] == "B")
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
						if(GOL_array[head1_y][head1_x] == "B")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
						state = 7;
						head2_x = head2_x + 1;
					}
				else if(GOL_array[head1_y][head1_x] == 1 || GOL_array[head1_y][head1_x] == "D")
					{
						fillcell_blue(ctx1,head1_y,head1_x);
						if(GOL_array[head1_y][head1_x] == "D")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
						state = 9;
						head2_x = head2_x + 3;
					}
				head1_x = head1_x + 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				break;
			case 7:
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				if(GOL_array[head1_y][head1_x] == 0 || GOL_array[head1_y][head1_x] == "B")
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
						if(GOL_array[head1_y][head1_x] == "B")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				else if(GOL_array[head1_y][head1_x] == 1 || GOL_array[head1_y][head1_x] == "D")
					{
						fillcell_blue(ctx1,head1_y,head1_x);
						if(GOL_array[head1_y][head1_x] == "D")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				head1_y = head1_y + 1;
				head2_x = head2_x + 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 8;
				break;
			case 8:
				//this one doesn't add one
				if(GOL_array[head1_y][head1_x] < 30)
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
					}
				else if(GOL_array[head1_y][head1_x] >= 30)
					{
						fillcell_blue(ctx1,head1_y,head1_x);
					}
				filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				head1_y = head1_y - 1;
				head2_x = head2_x - 7;
				head2_y = head2_y + 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 11;
				break;
			case 9:
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				if(GOL_array[head1_y][head1_x] == 0 || GOL_array[head1_y][head1_x] == "B")
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
						if(GOL_array[head1_y][head1_x] == "B")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				else if(GOL_array[head1_y][head1_x] == 1 || GOL_array[head1_y][head1_x] == "D")
					{
						fillcell_blue(ctx1,head1_y,head1_x);
						if(GOL_array[head1_y][head1_x] == "D")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				head1_y = head1_y + 1;
				head2_x = head2_x + 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 10;
				break;
			case 10:
				if(GOL_array[head1_y][head1_x] < 30)
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
					}
				else if(GOL_array[head1_y][head1_x] >= 30)
					{
						fillcell_blue(ctx1,head1_y,head1_x);
					}
				GOL_array[head1_y][head1_x] = GOL_array[head1_y][head1_x] + 1;
				filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				head1_y = head1_y - 1;
				head2_x = head2_x - 9;
				head2_y = head2_y + 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 11;
				break;
			case 11:
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				if(GOL_array[head1_y][head1_x] == 0 || GOL_array[head1_y][head1_x] == "B")
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
						if(GOL_array[head1_y][head1_x] == "B")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
						state = 12;
						head2_x = head2_x + 1;
					}
				else if(GOL_array[head1_y][head1_x] == 1 || GOL_array[head1_y][head1_x] == "D")
					{
						fillcell_blue(ctx1,head1_y,head1_x);
						if(GOL_array[head1_y][head1_x] == "D")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
						state = 14;
						head2_x = head2_x + 3;
					}
				head1_y = head1_y + 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				break;
			case 12:
				//this one doesn't add one
				if(GOL_array[head1_y][head1_x] < 30)
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
					}
				else if(GOL_array[head1_y][head1_x] >= 30)
					{
						fillcell_blue(ctx1,head1_y,head1_x);
					}
				filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				head1_y = head1_y - 1;
				head2_x = head2_x + 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 13;
				break;
			case 13:
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				if(GOL_array[head1_y][head1_x] == 0 || GOL_array[head1_y][head1_x] == "B")
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
						if(GOL_array[head1_y][head1_x] == "B")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				else if(GOL_array[head1_y][head1_x] == 1 || GOL_array[head1_y][head1_x] == "D")
					{
						fillcell_blue(ctx1,head1_y,head1_x);
						if(GOL_array[head1_y][head1_x] == "D")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				head1_x = head1_x + 1;
				head2_x = head2_x + 2;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 15;
				break;
			case 14:
				if(GOL_array[head1_y][head1_x] < 30)
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
					}
				else if(GOL_array[head1_y][head1_x] >= 30)
					{
						fillcell_blue(ctx1,head1_y,head1_x);
					}
				GOL_array[head1_y][head1_x] = GOL_array[head1_y][head1_x] + 1;
				filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				head1_y = head1_y - 1;
				head2_x = head2_x - 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 13;
				break;	
			case 15:
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				if(GOL_array[head1_y][head1_x] == 0 || GOL_array[head1_y][head1_x] == "B")
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
						if(GOL_array[head1_y][head1_x] == "B")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
						state = 16;
						head2_x = head2_x + 1;
					}
				else if(GOL_array[head1_y][head1_x] == 1 || GOL_array[head1_y][head1_x] == "D")
					{
						fillcell_blue(ctx1,head1_y,head1_x);
						if(GOL_array[head1_y][head1_x] == "D")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
						state = 18;
						head2_x = head2_x + 3;
					}
				else if(GOL_array[head1_y][head1_x] == "$")
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
						state = 39;
						head1_y = head1_y + 1; 
						head2_x = head2_x + 4;
						head2_y = head2_y + 2;
						fillcell_orange(ctx1,head1_y,head1_x,1);
						fillcell_orange(ctx2,head2_y,head2_x,2);
						break;
					}
				else if(GOL_array[head1_y][head1_x] == "$$")
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
						state = 43;
						head1_x = head1_x - 1;
						head2_x = head2_x - 2;
						head2_y = head2_y + 3;
						fillcell_orange(ctx2,head2_y,head2_x,2);
						fillcell_orange(ctx1,head1_y,head1_x,1);
						break;
					}
				head1_x = head1_x - 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				break;	
			case 16:
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				if(GOL_array[head1_y][head1_x] == 0 || GOL_array[head1_y][head1_x] == "B")
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
						if(GOL_array[head1_y][head1_x] == "B")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				else if(GOL_array[head1_y][head1_x] == 1 || GOL_array[head1_y][head1_x] == "D")
					{
						fillcell_blue(ctx1,head1_y,head1_x);
						if(GOL_array[head1_y][head1_x] == "D")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				head1_y = head1_y + 1;
				head2_x = head2_x + 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 17;
				break;
			case 17:
				if(GOL_array[head1_y][head1_x] < 30)
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
					}
				else if(GOL_array[head1_y][head1_x] >= 30)
					{
						fillcell_blue(ctx1,head1_y,head1_x);
					}
				filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				head1_x = head1_x + 1;
				head2_x = head2_x + 3;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 20;
				break;
			case 18:
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				if(GOL_array[head1_y][head1_x] == 0 || GOL_array[head1_y][head1_x] == "B")
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
						if(GOL_array[head1_y][head1_x] == "B")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				else if(GOL_array[head1_y][head1_x] == 1 || GOL_array[head1_y][head1_x] == "D")
					{
						fillcell_blue(ctx1,head1_y,head1_x);
						if(GOL_array[head1_y][head1_x] == "D")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				head1_y = head1_y + 1;
				head2_x = head2_x + 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 19;
				break;
			case 19:
				if(GOL_array[head1_y][head1_x] < 30)
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
					}
				else if(GOL_array[head1_y][head1_x] >= 30)
					{
						fillcell_blue(ctx1,head1_y,head1_x);
					}
				GOL_array[head1_y][head1_x] = GOL_array[head1_y][head1_x] + 1;
				filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				head1_x = head1_x + 1;
				head2_x = head2_x + 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 20;
				break;
			case 20:
				//NOTE MAKE SURE TO IMPLEMENT $ and $$
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				if(GOL_array[head1_y][head1_x] == 0 || GOL_array[head1_y][head1_x] == "B")
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
						if(GOL_array[head1_y][head1_x] == "B")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
								state = 23;
								head2_x = head2_x - 7;
								head2_y = head2_y + 1;
							}
						else
							{
								state = 21;
								head2_x = head2_x - 9;
								head2_y = head2_y + 1;
							}
					}
				else if(GOL_array[head1_y][head1_x] == 1 || GOL_array[head1_y][head1_x] == "D")
					{
						fillcell_blue(ctx1,head1_y,head1_x);
						if(GOL_array[head1_y][head1_x] == "D")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
								state = 21;
								head2_x = head2_x - 9;
								head2_y = head2_y + 1;
							}
						else
							{
								state = 23;
								head2_x = head2_x - 7;
								head2_y = head2_y + 1;
							}
					}
				head1_x = head1_x - 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				break;
			case 21:
				if(GOL_array[head1_y][head1_x] < 30)
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
					}
				else if(GOL_array[head1_y][head1_x] >= 30)
					{
						fillcell_blue(ctx1,head1_y,head1_x);
					}
				filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				head1_y = head1_y + 1;
				head2_x = head2_x + 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 22;
				break;
			case 22:
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				if(GOL_array[head1_y][head1_x] == 0 || GOL_array[head1_y][head1_x] == "B")
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
						if(GOL_array[head1_y][head1_x] == "B")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				else if(GOL_array[head1_y][head1_x] == 1 || GOL_array[head1_y][head1_x] == "D")
					{
						fillcell_blue(ctx1,head1_y,head1_x);
						if(GOL_array[head1_y][head1_x] == "D")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				
				head1_x = head1_x + 1;
				head2_x = head2_x + 2;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 24;
				break;
			case 23:
				if(GOL_array[head1_y][head1_x] < 30)
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
					}
				else if(GOL_array[head1_y][head1_x] >= 30)
					{
						fillcell_blue(ctx1,head1_y,head1_x);
					}
				GOL_array[head1_y][head1_x] = GOL_array[head1_y][head1_x] + 1;
				filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				head1_y = head1_y + 1;
				head2_x = head2_x - 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 22;
				break;
			case 24:
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				if(GOL_array[head1_y][head1_x] == 0 || GOL_array[head1_y][head1_x] == "B")
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
						if(GOL_array[head1_y][head1_x] == "B")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
								state = 27;
								head2_x = head2_x + 3;
							}
						else
							{
								state = 25;
								head2_x = head2_x + 1;
							}
					}
				else if(GOL_array[head1_y][head1_x] == 1 || GOL_array[head1_y][head1_x] == "D")
					{
						fillcell_blue(ctx1,head1_y,head1_x);
						if(GOL_array[head1_y][head1_x] == "D")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
								state = 25;
								head2_x = head2_x + 1;
							}
						else
							{
								state = 27;
								head2_x = head2_x + 3;
							}
					}
				head1_x = head1_x - 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				break;
			case 25:
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				if(GOL_array[head1_y][head1_x] == 0 || GOL_array[head1_y][head1_x] == "B")
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
						if(GOL_array[head1_y][head1_x] == "B")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				else if(GOL_array[head1_y][head1_x] == 1 || GOL_array[head1_y][head1_x] == "D")
					{
						fillcell_blue(ctx1,head1_y,head1_x);
						if(GOL_array[head1_y][head1_x] == "D")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				
				head1_y = head1_y - 1;
				head2_x = head2_x + 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 26;
				break;
			case 26:
				if(GOL_array[head1_y][head1_x] < 30)
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
					}
				else if(GOL_array[head1_y][head1_x] >= 30)
					{
						fillcell_blue(ctx1,head1_y,head1_x);
					}
				filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				head1_y = head1_y + 1;
				head2_x = head2_x + 3;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 29;
				break;
			case 27:
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				if(GOL_array[head1_y][head1_x] == 0 || GOL_array[head1_y][head1_x] == "B")
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
						if(GOL_array[head1_y][head1_x] == "B")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				else if(GOL_array[head1_y][head1_x] == 1 || GOL_array[head1_y][head1_x] == "D")
					{
						fillcell_blue(ctx1,head1_y,head1_x);
						if(GOL_array[head1_y][head1_x] == "D")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				head1_y = head1_y - 1;
				head2_x = head2_x + 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 28;
				break;
			case 28:
				if(GOL_array[head1_y][head1_x] < 30)
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
					}
				else if(GOL_array[head1_y][head1_x] >= 30)
					{
						fillcell_blue(ctx1,head1_y,head1_x);
					}
				GOL_array[head1_y][head1_x] = GOL_array[head1_y][head1_x] + 1;
				filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				head1_y = head1_y + 1;
				head2_x = head2_x + 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 29;
				break;
			case 29:
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				if(GOL_array[head1_y][head1_x] == 0 || GOL_array[head1_y][head1_x] == "B")
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
						if(GOL_array[head1_y][head1_x] == "B")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
								state = 32;
								head2_x = head2_x - 7;
								head2_y = head2_y + 1;
							}
						else
							{
								state = 30;
								head2_x = head2_x + 1;
							}
					}
				else if(GOL_array[head1_y][head1_x] == 1 || GOL_array[head1_y][head1_x] == "D")
					{
						fillcell_blue(ctx1,head1_y,head1_x);
						if(GOL_array[head1_y][head1_x] == "D")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
								state = 30;
								head2_x = head2_x + 1;
							}
						else
							{
								state = 32;
								head2_x = head2_x - 7;
								head2_y = head2_y + 1;
							}
					}
				head1_y = head1_y - 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				break;
			case 30:
				if(GOL_array[head1_y][head1_x] < 30)
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
					}
				else if(GOL_array[head1_y][head1_x] >= 30)
					{
						fillcell_blue(ctx1,head1_y,head1_x);
					}
				filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				head1_y = head1_y + 1;
				head2_x = head2_x - 9;
				head2_y = head2_y + 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 31;
				break;
			case 31:
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				if(GOL_array[head1_y][head1_x] == 0 || GOL_array[head1_y][head1_x] == "B")
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
						if(GOL_array[head1_y][head1_x] == "B")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				else if(GOL_array[head1_y][head1_x] == 1 || GOL_array[head1_y][head1_x] == "D")
					{
						fillcell_blue(ctx1,head1_y,head1_x);
						if(GOL_array[head1_y][head1_x] == "D")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				head1_x = head1_x - 1;
				head2_x = head2_x + 2;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 33;
				break;
			case 32:
				if(GOL_array[head1_y][head1_x] < 30)
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
					}
				else if(GOL_array[head1_y][head1_x] >= 30)
					{
						fillcell_blue(ctx1,head1_y,head1_x);
					}
				GOL_array[head1_y][head1_x] = GOL_array[head1_y][head1_x] + 1;
				filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				head1_y = head1_y + 1;
				head2_x = head2_x - 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 31;
				break;
			case 33:
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				if(GOL_array[head1_y][head1_x] == 0 || GOL_array[head1_y][head1_x] == "B")
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
						if(GOL_array[head1_y][head1_x] == "B")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
								state = 36;
								head2_x = head2_x + 3;
							}
						else
							{
								state = 34;
								head2_x = head2_x + 1;
							}
					}
				else if(GOL_array[head1_y][head1_x] == 1 || GOL_array[head1_y][head1_x] == "D")
					{
						fillcell_blue(ctx1,head1_y,head1_x);
						if(GOL_array[head1_y][head1_x] == "D")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
								state = 34;
								head2_x = head2_x + 1;
							}
						else
							{
								state = 36;
								head2_x = head2_x + 3;
							}
					}
				head1_x = head1_x + 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				break;
			case 34:
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				if(GOL_array[head1_y][head1_x] == 0 || GOL_array[head1_y][head1_x] == "B")
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
						if(GOL_array[head1_y][head1_x] == "B")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				else if(GOL_array[head1_y][head1_x] == 1 || GOL_array[head1_y][head1_x] == "D")
					{
						fillcell_blue(ctx1,head1_y,head1_x);
						if(GOL_array[head1_y][head1_x] == "D")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				head1_y = head1_y - 1;
				head2_x = head2_x + 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 35;
				break;
			case 35:
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				head2_x = head2_x + 3;
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 38;
				break;
			case 36:
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				if(GOL_array[head1_y][head1_x] == 0 || GOL_array[head1_y][head1_x] == "B")
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
						if(GOL_array[head1_y][head1_x] == "B")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				else if(GOL_array[head1_y][head1_x] == 1 || GOL_array[head1_y][head1_x] == "D")
					{
						fillcell_blue(ctx1,head1_y,head1_x);
						if(GOL_array[head1_y][head1_x] == "D")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				head1_y = head1_y - 1;
				head2_x = head2_x + 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 37;
				break;
			case 37:
				GOL_array[head1_y][head1_x] = GOL_array[head1_y][head1_x] + 1;
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				head2_x = head2_x + 1;
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 38;
				break;
			case 38:
				//can if statements its point
				//now evaluate the results
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				if(GOL_array[head1_y][head1_x]%40 < 10)
					{
						GOL_array[head1_y][head1_x] = GOL_array[head1_y][head1_x] - 40;
						fillcell_white(ctx1,head1_y,head1_x,1);
						if(GOL_array[head1_y][head1_x] == 3)
							{
								GOL_array[head1_y][head1_x] = "B";
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
						else
							GOL_array[head1_y][head1_x] = 0;
					}
				else if(GOL_array[head1_y][head1_x]%30 < 10)
					{
						GOL_array[head1_y][head1_x] = GOL_array[head1_y][head1_x] - 30;
						fillcell_blue(ctx1,head1_y,head1_x);
						if(GOL_array[head1_y][head1_x] < 2)
							{
								GOL_array[head1_y][head1_x] = "D";
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
						else if(GOL_array[head1_y][head1_x] == 2 || GOL_array[head1_y][head1_x] == 3)
							{
								GOL_array[head1_y][head1_x] = 1;
							}
						else
							{
								GOL_array[head1_y][head1_x] = "D";
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				else if(GOL_array[head1_y][head1_x]%20 < 10)
					{
						GOL_array[head1_y][head1_x] = GOL_array[head1_y][head1_x] - 20;
						fillcell_blue(ctx1,head1_y,head1_x);
						if(GOL_array[head1_y][head1_x] < 2)
							{
								GOL_array[head1_y][head1_x] = "D";
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
						else if(GOL_array[head1_y][head1_x] == 2 || GOL_array[head1_y][head1_x] == 3)
							{
								GOL_array[head1_y][head1_x] = 1;
							}
						else
							{
								GOL_array[head1_y][head1_x] = "D";
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}	
					}
				else
					{
						GOL_array[head1_y][head1_x] = GOL_array[head1_y][head1_x] - 10;
						fillcell_white(ctx1,head1_y,head1_x,1);
						if(GOL_array[head1_y][head1_x] == 3)
							{
								GOL_array[head1_y][head1_x] = "B";
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
						else
							GOL_array[head1_y][head1_x] = 0;
					}
				head1_x = head1_x + 1;
				head2_x = head2_x - 7;
				head2_y = head2_y - 3;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 1;
				break;
			case 39:
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				fillcell_white(ctx1,head1_y,head1_x,1);
				head1_x = head1_x - 1;
				head2_x = head2_x + 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 40;
				break;
			case 40:
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				GOL_array[head1_y][head1_x] = 0;
				fillcell_white(ctx1,head1_y,head1_x,1);
				head1_y = head1_y + 1;
				head2_x = head2_x - 9;
				head2_y = head2_y + 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 41;
				break;
			case 41:
				if(GOL_array[head1_y][head1_x] == "$")
					{
						fillcell_white(ctx2,head2_y,head2_x,2);
						fill_number(ctx2,head2_y,head2_x,state);
						fillcell_white(ctx1,head1_y,head1_x,1);
						head1_x = head1_x + 1;
						head2_x = head2_x + 1;
						fillcell_orange(ctx1,head1_y,head1_x,1);
						fillcell_orange(ctx2,head2_y,head2_x,2);
						state = 42;
						break;	
					}
				else
				{
				if(GOL_array[head1_y][head1_x] == 0 || GOL_array[head1_y][head1_x] == "B")
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
						if(GOL_array[head1_y][head1_x] == "B")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				else if(GOL_array[head1_y][head1_x] == 1 || GOL_array[head1_y][head1_x] == "D")
					{
						fillcell_blue(ctx1,head1_y,head1_x);
						if(GOL_array[head1_y][head1_x] == "D")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				head1_x = head1_x - 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				state = 41;
				break;	
				}
			case 42:
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				fillcell_white(ctx1,head1_y,head1_x,1);
				head1_x = head1_x + 1;
				head2_x = head2_x - 1;
				head2_y = head2_y - 4;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 1;
				break;
			case 43:
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				if(GOL_array[head1_y][head1_x] == 0 || GOL_array[head1_y][head1_x] == "B")
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
						if(GOL_array[head1_y][head1_x] == "B")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				else if(GOL_array[head1_y][head1_x] == 1 || GOL_array[head1_y][head1_x] == "D")
					{
						fillcell_blue(ctx1,head1_y,head1_x);
						if(GOL_array[head1_y][head1_x] == "D")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				head1_y = head1_y + 1;
				head2_x = head2_x + 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 44;
				break;	
			case 44:
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				GOL_array[head1_y][head1_x] = 0;
				fillcell_white(ctx1,head1_y,head1_x,1);
				head1_x = head1_x - 1;
				head2_x = head2_x + 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 45;
				break;
			case 45:
				if(GOL_array[head1_y][head1_x] == "$")
					{
						fillcell_white(ctx2,head2_y,head2_x,2);
						fill_number(ctx2,head2_y,head2_x,state);
						fillcell_white(ctx1,head1_y,head1_x,1);
						head1_y = head1_y - 1;
						head2_x = head2_x + 1;
						fillcell_orange(ctx1,head1_y,head1_x,1);
						fillcell_orange(ctx2,head2_y,head2_x,2);
						state = 46;
						break;	
					}
				else
				{
				if(GOL_array[head1_y][head1_x] == 0 || GOL_array[head1_y][head1_x] == "B")
					{
						fillcell_white(ctx1,head1_y,head1_x,1);
						if(GOL_array[head1_y][head1_x] == "B")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				else if(GOL_array[head1_y][head1_x] == 1 || GOL_array[head1_y][head1_x] == "D")
					{
						fillcell_blue(ctx1,head1_y,head1_x);
						if(GOL_array[head1_y][head1_x] == "D")
							{
								filltext_grid(ctx1,head1_y,head1_x,GOL_array[head1_y][head1_x]);
							}
					}
				head1_x = head1_x - 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 45;
				break;	
				}
			case 46:
				if(GOL_array[head1_y][head1_x] == "$$")
					{
						fillcell_white(ctx2,head2_y,head2_x,2);
						fill_number(ctx2,head2_y,head2_x,state);
						fillcell_white(ctx1,head1_y,head1_x,1);
						head1_y = head1_y + 1;
						head2_x = head2_x + 1;
						fillcell_orange(ctx1,head1_y,head1_x,1);
						fillcell_orange(ctx2,head2_y,head2_x,2);
						state = 47;
						break;	
					}
				else
				{
				fillcell_white(ctx1,head1_y,head1_x,1);
				head1_y = head1_y - 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				state = 46;
				break;	
				}
			case 47:
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				fillcell_white(ctx1,head1_y,head1_x,1);
				head1_x = head1_x + 1;
				head2_x = head2_x + 1;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 48;
				break;
			case 48:
				fillcell_white(ctx2,head2_y,head2_x,2);
				fill_number(ctx2,head2_y,head2_x,state);
				fillcell_white(ctx1,head1_y,head1_x,1);
				head1_x = head1_x + 1;
				head2_x = head2_x - 7;
				head2_y = head2_y - 4;
				fillcell_orange(ctx1,head1_y,head1_x,1);
				fillcell_orange(ctx2,head2_y,head2_x,2);
				state = 1;
				inter = inter + 1; 
				break;
		}
	//delay the next tm call
	if(inter != 10)
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
//fill a cell with blue
function fillcell_blue(rctx, yCord, xCord)
{
	rctx.fillStyle = "cornflowerBlue"
	//formulas to fill in the correct square
	var x = (xCord)*10;
	var y = yCord*10;
	rctx.fillRect(x,y,10,10);
	rctx.fillStyle = "black";
	rctx.strokeRect(x,y,10,10);
}
//fill the cell with text
function filltext_grid(rctx, yCord, xCord, text)
{
	rctx.fillStyle = "black";
	rctx.font = "10px Arial";
	var x = xCord*10+2;
	var y = yCord*10+10;
	if(text >= 10)
		{
			x = x - 3;
		}
	if(yCord == 20 && xCord == 43)
		{
			x = 429 
		}
	rctx.fillText(text,x,y);
}
//fill a state cell with number
function fill_number(rctx, yCord, xCord, number)
{
	if(number < 10)
		{
			//adding 40 to each one
			var y = 30+40*yCord;
			var x = 10+40*xCord;
			rctx.fillText(number,x,y);
		}
	else
		{
			var y = 30+40*yCord;
			var x = 5+40*xCord;
			rctx.fillText(number,x,y);
		}
}
//fill a square with white given an xCord and ycord
function fillcell_white(rctx, yCord, xCord, grid )
{
	rctx.fillStyle = "white"
	//for GOL grid
	if(grid == 1)
		{
			//formulas to fill in the correct square
			var x = (xCord)*10;
			var y = yCord*10;
			rctx.fillRect(x,y,10,10);
			rctx.fillStyle = "black";
			rctx.strokeRect(x,y,10,10);
			if(((yCord == 0 || yCord == 22) && xCord > 0 && xCord < 43)|| ((yCord >= 0 && yCord <= 22) && (xCord == 1 || xCord == 42)) )
				{
					filltext_grid(rctx,yCord,xCord,"0");
				}
			else if(yCord==20 && xCord == 43)
				{
					filltext_grid(rctx,yCord,xCord,"$$");
				}
			else if( (xCord== 0 || xCord == 43) && (yCord >= 0 && yCord <= 22))
				{
					filltext_grid(rctx,yCord,xCord,"$");
				}
		}
	//for state grid
	else
		{
			//formulas to fill in the correct square
			var x = (xCord)*40;
			var y = yCord*40;
			rctx.fillRect(x,y,40,40);
			rctx.fillStyle = "black";
			rctx.strokeRect(x,y,40,40);
		}
}
//fill a square with orange given an xCord and ycord
function fillcell_orange(rctx, yCord, xCord, grid)
{
	rctx.fillStyle = "orange"
	//for cella grid
	if(grid == 1)
		{
			//formulas to fill in the correct square
			var x = (xCord)*10;
			var y = yCord*10;
			rctx.fillRect(x,y,10,10);
		}
	//for state grid
	else
		{
			//formulas to fill in the correct square
			var x = (xCord)*40;
			var y = yCord*40;
			rctx.fillRect(x,y,40,40);
		}
}
//function timers to change the delay
function slow_timer()
{
	timer = timer + 100;
}
function speed_up()
{
	if(timer > 100)
		{
			timer = timer - 100;
		}
}

