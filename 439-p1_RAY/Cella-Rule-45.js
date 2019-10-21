/*
Author: Raymond Gonzalez
Email: rayraygking@csu.fullerton.edu
File Name: Cella-Rule-45.js
Purpose: Provide functions that draw grid, generate Cella rule 45,
and reset the canvas
*/
//global variables so i dont have to pass so many arguements
	var head1_x = 2;
	var head1_y = 0;
	var head2_x = 0;
	var head2_y = 0;
	var timer = 2000;
	//place initial head;
	var state = 0;
	var cella_array = Create2DArray(44,21);
function draw_grid2( rctx, rminor, rmajor, rstroke, rfill  ) 
{
    rctx.save( );
	//color of grid lines
    rctx.strokeStyle = rstroke;
    rctx.fillStyle = rfill;
    let width = rctx.canvas.width;
    let height = rctx.canvas.height;
	//ctx.strokeText("1", 10, 50);
    for ( var ix = 0; ix < width; ix += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( ix, 0 );
        rctx.lineTo( ix, height );
        rctx.lineWidth = ( ix % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
      //  if ( ix % rmajor == 0 ) { rctx.fillText( ix, ix, 10 ); }
    }
    for ( var iy = 0; iy < height; iy += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( 0, iy );
        rctx.lineTo( width, iy );
        rctx.lineWidth = ( iy % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
      //  if ( iy % rmajor == 0 ) {rctx.fillText( iy, 0, iy + 10 );}
    }
    rctx.restore( );
}
function fill_grid_2(rctx)
{
	rctx.font = "30px Arial";
	rctx.fillStyle = "black";
	//adding 40 to each one
	var y = 30;
	var x = 10;
	//TM state Grid
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
//function to draw the actual grid 
function draw_grid_1( rctx, rminor, rmajor, rstroke, rfill  ) 
{
    rctx.save( );
	//color of grid lines
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
//create a 2D Array of 1600 each representing the grid 40 by 40 
//pixels=400 conversion to cell is /10 =
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
	//make top rows 200th cell state 1
  return gridArray;
}
function start_cella_150(ctx1,ctx2)
{

	//fill the starting black
	cella_array[0][21]= 1;
	//fill the $ signs
	//4 = $
	for(var y = 0; y < 21; y=y+1)
		{
			cella_array[y][0] = "$";
			cella_array[y][43] = "$";
		}
	cella_array[19][43] = "$$";

	//start the TM
	Tm(ctx1,ctx2);
	//todo list 
		//create arrays for grid one and two
		//fill arrayG1 with 0/1 and grid2 with one-to-one map of states
		//start initializing the TM

}

function Tm(ctx1, ctx2)
{	
	switch(state)
		{
			case 0:
				fillcell_orange(ctx1,0,2,1);
				fillcell_orange(ctx2,0,0,2);
				state = 1;
				break;
			case 1:
				//change current head pos to white
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				//move head
				head1_x = head1_x - 1;
				//next state
				head2_x = head2_x + 1;
				//fill current head to orange
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 2;
				break;
			case 2:
				//change current head pos to white
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				if(cella_array[head1_y][head1_x]== 0)
					{
						//move head
						head1_x = head1_x + 1;
						//next state
						head2_x = head2_x + 1;
						//fill current head to orange
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 3;
						break;
					}
				else
					{
						//move head 
						head1_x = head1_x + 1;
						//next state
						head2_x = head2_x + 2;
						//fill
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						//move head on right grid
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
						//move head
						head1_x = head1_x + 1;
						//next state
						head2_x = head2_x + 2;
						//fill current head to orange
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 5;
						break;
					}
				else
					{
						//move head 
						head1_x = head1_x + 1;
						//next state
						head2_x = head2_x + 3;
						//fill
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						//move head on right grid
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
						//move head
						head1_x = head1_x + 1;
						//next state
						head2_x = head2_x + 3;
						//fill current head to orange
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 7;
						break;
					}
				else
					{
						//move head 
						head1_x = head1_x + 1;
						//next state
						head2_x = head2_x + 4;
						//fill
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						//move head on right grid
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 8;
						break;
					}
			case 5:
				if(cella_array[head1_y][head1_x]==0 || cella_array[head1_y][head1_x]== "$")
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				if(cella_array[head1_y][head1_x]== "$")
					{
						//move head
						head1_y = head1_y + 1;
						//next state
						head2_x = head2_x + 1;
						head2_y = head2_y + 2;
						//fill current head to orange
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 26;
						break;
					}
				else if(cella_array[head1_y][head1_x]== "$$")
					{
						//next state
						head2_x = head2_x + 4;
						head2_y = head2_y + 2;
						//fill current head to orange
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 29;
						break;
					}
				else if(cella_array[head1_y][head1_x]== 0)
					{
						//move head
						head1_x = head1_x - 1;
						//next state
						head2_x = head2_x + 4;
						//fill current head to orange
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 9;
						break;
					}
				else
					{
						//move head 
						head1_x = head1_x - 1;
						//next state
						head2_x = head2_x + 5;
						//fill
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						//move head on right grid
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 10;
						break;
					}
			case 6:
				if(cella_array[head1_y][head1_x]==0 || cella_array[head1_y][head1_x]== "$")
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				if(cella_array[head1_y][head1_x]== "$")
					{
						//move head
						head1_y = head1_y + 1;
						//next state
						head2_y = head2_y + 2;
						//fill current head to orange
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 26;
						break;
					}
				if(cella_array[head1_y][head1_x]== "$$")
					{
						//next state
						head2_x = head2_x + 3;
						head2_y = head2_y + 2;
						//fill current head to orange
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 29;
						break;
					}
				if(cella_array[head1_y][head1_x]== 0)
					{
						//move head
						head1_x = head1_x - 1;
						//next state
						head2_x = head2_x - 5;
						head2_y = head2_y + 1;
						//fill current head to orange
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 11;
						break;
					}
				else
					{
						//move head 
						head1_x = head1_x - 1;
						//next state
						head2_x = head2_x - 4;
						head2_y = head2_y + 1;
						//fill
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						//move head on right grid
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 12;
						break;
					}
			case 7:
				if(cella_array[head1_y][head1_x]==0 || cella_array[head1_y][head1_x]== "$")
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				if(cella_array[head1_y][head1_x]== "$")
					{
						//move head
						head1_y = head1_y + 1;
						//next state
						head2_y = head2_y + 2;
						head2_x = head2_x - 1;
						//fill current head to orange
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 26;
						break;
					}
				if(cella_array[head1_y][head1_x]== "$$")
					{
						//next state
						head2_x = head2_x + 2;
						head2_y = head2_y + 2;
						//fill current head to orange
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 29;
						break;
					}
				if(cella_array[head1_y][head1_x]== 0)
					{
						//move head
						head1_x = head1_x - 1;
						//next state
						head2_x = head2_x - 4;
						head2_y = head2_y + 1;
						//fill current head to orange
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 13;
						break;
					}
				else
					{
						//move head 
						head1_x = head1_x - 1;
						//next state
						head2_x = head2_x - 3;
						head2_y = head2_y + 1;
						//fill
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						//move head on right grid
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 14;
						break;
					}
			case 8:
				if(cella_array[head1_y][head1_x]==0 || cella_array[head1_y][head1_x]== "$")
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				if(cella_array[head1_y][head1_x]== "$")
					{
						//move head
						head1_y = head1_y + 1;
						//next state
						head2_y = head2_y + 2;
						head2_x = head2_x - 2;
						//fill current head to orange
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 26;
						break;
					}
				if(cella_array[head1_y][head1_x]== "$$")
					{
						//next state
						head2_x = head2_x + 1;
						head2_y = head2_y + 2;
						//fill current head to orange
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 29;
						break;
					}
				if(cella_array[head1_y][head1_x]== 0)
					{
						//move head
						head1_x = head1_x - 1;
						//next state
						head2_x = head2_x - 3;
						head2_y = head2_y + 1;
						//fill current head to orange
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 15;
						break;
					}
				else
					{
						//move head 
						head1_x = head1_x - 1;
						//next state
						head2_x = head2_x - 2;
						head2_y = head2_y + 1;
						//fill
						fillcell_orange(ctx1, head1_y, head1_x, 1);
						//move head on right grid
						fillcell_orange(ctx2, head2_y, head2_x, 2);
						state = 16;
						break;
					}
			case 9: 
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				//move head 
				head1_y = head1_y + 1;
				//next state
				head2_x = head2_x - 2;
				head2_y = head2_y + 1;
				//fill
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				//move head on right grid
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 17;
				break;
			case 10: 
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				//move head 
				head1_y = head1_y + 1;
				//next state
				head2_x = head2_x - 2;
				head2_y = head2_y + 1;
				//fill
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				//move head on right grid
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 18;
				break;
			case 11: 
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				//move head 
				head1_y = head1_y + 1;
				//next state
				head2_x = head2_x + 8;
				//fill
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				//move head on right grid
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 19;
				break;
			case 12: 
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				//move head 
				head1_y = head1_y + 1;
				//next state
				head2_x = head2_x - 2;
				head2_y = head2_y + 1;
				//fill
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				//move head on right grid
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 20;
				break;
			case 13: 
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				//move head 
				head1_y = head1_y + 1;
				//next state
				head2_x = head2_x - 2;
				head2_y = head2_y + 1;
				//fill
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				//move head on right grid
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 21;
				break;
			case 14: 
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				//move head 
				head1_y = head1_y + 1;
				//next state
				head2_x = head2_x - 2;
				head2_y = head2_y + 1;
				//fill
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				//move head on right grid
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 22;
				break;
			case 15: 
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				//move head 
				head1_y = head1_y + 1;
				//next state
				head2_x = head2_x - 2;
				head2_y = head2_y + 1;
				//fill
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				//move head on right grid
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 23;
				break;
			case 16: 
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				//move head 
				head1_y = head1_y + 1;
				//next state
				head2_x = head2_x - 2;
				head2_y = head2_y + 1;
				//fill
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				//move head on right grid
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 24;
				break;
			case 17: 
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				//move head 
				head1_y = head1_y - 1;
				//next state
				head2_x = head2_x - 2;
				head2_y = head2_y + 1;
				//fill
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				//move head on right grid
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
				//move head 
				head1_y = head1_y - 1;
				//next state
				head2_x = head2_x - 3;
				head2_y = head2_y + 1;
				//fill
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				//move head on right grid
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
				//move head 
				head1_y = head1_y - 1;
				//next state
				head2_x = head2_x - 4;
				head2_y = head2_y + 1;
				//fill
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				//move head on right grid
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 25;
				break;
			case 20: 
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				//move head 
				head1_y = head1_y - 1;
				//next state
				head2_x = head2_x + 5;
				//fill
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				//move head on right grid
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
				//move head 
				head1_y = head1_y - 1;
				//next state
				head2_x = head2_x + 4;
				//fill
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				//move head on right grid
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 25;
				break;
			case 22: 
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				//move head 
				head1_y = head1_y - 1;
				//next state
				head2_x = head2_x + 3;
				//fill
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				//move head on right grid
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 25;
				break;
			case 23: 
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				//move head 
				head1_y = head1_y - 1;
				//next state
				head2_x = head2_x + 2;
				//fill
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				//move head on right grid
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
				//move head 
				head1_y = head1_y - 1;
				//next state
				head2_x = head2_x + 1;
				//fill
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				//move head on right grid
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 25;
				break;
			case 25: 
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				//move head 
				head1_x = head1_x + 1;
				//next state
				head2_x = head2_x - 4;
				head2_y = head2_y - 2;
				//fill
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				//move head on right grid
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 1;
				break;
			case 26: 
				if(cella_array[head1_y][head1_x]==0 || cella_array[head1_y][head1_x]== "$")
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				//move head 
				head1_x = head1_x - 1;
				//next state
				head2_x = head2_x + 1;
				//fill
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				//move head on right grid
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 27;
				break;
			case 27: 
				if(cella_array[head1_y][head1_x]==0 || cella_array[head1_y][head1_x]== "$")
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
					if(cella_array[head1_y][head1_x] == "$")
						{
							//move head 
							head1_x = head1_x + 1;
							//next state
							head2_x = head2_x + 1;
							//fill
							fillcell_orange(ctx1, head1_y, head1_x, 1);
							//move head on right grid
							fillcell_orange(ctx2, head2_y, head2_x, 2);
							state = 28;
							break;
						}
				//move head 
				head1_x = head1_x - 1;
				//next state
				//fill
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				//move head on right grid
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 27;
				break;
			case 28: 
				if(cella_array[head1_y][head1_x]==0)
					fillcell_white(ctx1, head1_y, head1_x, 1, state);
				else
					fillcell_black(ctx1,head1_y,head1_x);
				fillcell_white(ctx2, head2_y, head2_x, 2, state);
				//move head 
				head1_x = head1_x + 1;
				//next state
				head2_x = head2_x - 7;
				head2_y = head2_y - 2;
				//fill
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				//move head on right grid
				fillcell_orange(ctx2, head2_y, head2_x, 2);
				state = 1;
				break;
			case 29: 
				fillcell_orange(ctx1, head1_y, head1_x, 1);
				state = 29;
				break;
			
		}
	if(state != 29)
		{ setTimeout(Tm,timer,ctx1,ctx2)}
}
//fill a square with black give an xCord and ycord
function fillcell_black(rctx, yCord, xCord)
{
	rctx.fillStyle = "black"
	//formulas to fill in the correct square
	var x = (xCord)*10;
	var y = yCord*10;
	rctx.fillRect(x,y,10,10);
}

//fill a square with black give an xCord and ycord
function fillcell_white(rctx, yCord, xCord, grid , number)
{
	rctx.fillStyle = "white"
	if(grid == 1)
		{
			//formulas to fill in the correct square
			var x = (xCord)*10;
			var y = yCord*10;
			rctx.fillRect(x,y,10,10);
			rctx.fillStyle = "black";
			rctx.strokeRect(x,y,10,10);
			//x2 and y10
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
			else if (xCord == 43)
				{
					rctx.font = "10px Arial";
					rctx.fillText("$",432,10+10*yCord)
				}
		}
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
					//TM state Grid	
					
					
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
				//TM state Grid
				
			}
		}
}
//fill a square with black give an xCord and ycord
function fillcell_orange(rctx, yCord, xCord, grid)
{
	if(grid == 1)
		{
			rctx.fillStyle = "orange"
			//formulas to fill in the correct square
			var x = (xCord)*10;
			var y = yCord*10;
			rctx.fillRect(x,y,10,10);
		}
	else
		{
			rctx.fillStyle = "orange"
			//formulas to fill in the correct square
			var x = (xCord)*40;
			var y = yCord*40;
			rctx.fillRect(x,y,40,40);
		}
}
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
