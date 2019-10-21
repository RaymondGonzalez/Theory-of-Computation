Intro:

	Creating a Turing Machine that simulates Conway's GOL (TMGOL), and using Javascript with an HTML 
web page for display. The main strategy/algorithm used to emulate the GOL is a switch statement.
The program uses an array filled with 0 and $ (end markers) for the tape. Start_GOL() 
is the main function of the GOL that will call TM(), which is the TM that emulates Conway's GOL.
Tm() contains every Tm state within the switch statement and calls itself after processing a state.
Processing a state would be following the instructions of the current state
and returning the next state. Tm() manages the header display within the TM state instructions. Tm() 
emulates GOL by changing the previous generation to the current and computing and displaying the next generation.
For example, Tm() will go through the array one cell at a time replacing D to white(not alive) and replace B to 
blue(alive). After displaying the current generation of one cell the program will compute the next generation change,
if the current cell dies it will write D and if it births it will write B. To compute the next generation the tm visits
each of the eight surrounding cells and records if it is alive or not. For example, the tm would visit the left surrounding cell 
return to the middle cell and read the contents of the middle cell and if the left surrounding cell was alive 
write the contents of the middle cell + 1 or do nothing if it was dead. After visiting all surrounding
cells, the middle cell would contain the count of all alive surrounding cells. TM() will process one state at a time and will go through 10 generations.

Contents: 
-Tm-Conway-GOL.js
-Js-1-GOL.html
-styles.css
-Complexity Order.docx
-README.txt

External requirements: NONE

How to show/Setup:
1. Drag and drop html file (Js-1-GOL.html) onto browser
2. Click the GOL object button to set it in the grid
3. Click the Start GOL Button
4. speed up or slow down button to reduce speed of header
(All files must be in the same folder)
(folder must be named 439-p3_RAY)

Features:
-Emulate conway GOL
-Time Button
 (Set the speed of the TM header)
-Buttons to set GOL objects

