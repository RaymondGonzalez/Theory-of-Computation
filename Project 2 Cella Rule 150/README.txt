Intro:
	Displaying the generational progress of Wolfram's Rule-150 cellular
automaton using JavaScript with an HTML web page for display. The main strategy/algorithm
used to generate rows is a switch statement to manage the TM states. Using an array to 
represent the cella grid the function start_cella_150() will insert the 0 and $ (end markers)
in the array. Start_cella_150() will then call TM(), which is the TM emulating function that 
contains all the states. Tm() contains every Tm state within a switch statement and calls itself 
after processing a state. Processing a state would be following the instructions of the current state
and returning the next state. Tm() also manages the header display within the TM state instructions.
TM() will process one state at a time and starts at state 0 until it reaches state 29, the end of the generation. 

Contents: 
-Cella-Rule-150.js
-Js-1.html
-styles.css
-Complexity Order.docx

External requirements: NONE

How to show/Setup:
1. Drag and drop html file (Js-1.html) onto browser
2. Click the speed at which you want the header to change
3. Click the Start Cella Generation Button
(All files must be in the same folder)
(folder must be named 439-p2_RAY)

Features:
-Generate Cella Rule 150 Button
 (Show generation of rows using Cella Rule 150)
-Time Button
 (Set the speed of the TM header)

TM states:
state:	Read:	Print:	Move:		Next State:
1	N/A	N/A	Left Old	2

2	0	N/A	Right Old	3
	1	N/A	Right Old	4

3	0	N/A	Right Old	5
	1	N/A	Right Old	6

4	0	N/A	Right Old	7
	1	N/A	Right Old	8

5	0	N/A	Left Old	9
	1	N/A	Left Old	10
	$	N/A	Down		26
	$$	N/A	N/A		29

6	0	N/A	Left Old	11
	1	N/A	Left Old	12
	$	N/A	Down		26
	$$	N/A	N/A		29

7	0	N/A	Left Old	13
	1	N/A	Left Old	14
	$	N/A	Down		26
	$$	N/A	N/A		29

8	0	N/A	Left Old	15
	1	N/A	Left Old	16
	$	N/A	Down		26
	$$	N/A	N/A		29

9	N/A	N/A	Down		17

10	N/A	N/A	Down		18

11	N/A	N/A	Down		19

12	N/A	N/A	Down		20

13	N/A	N/A	Down		21

14	N/A	N/A	Down		22

15	N/A	N/A	Down		23

16	N/A	N/A	Down		24

17	N/A	0	UP		25

18	N/A	1	UP		25

19	N/A	1	UP		25

20	N/A	0	UP		25

21	N/A	1	UP		25

22	N/A	0	UP		25

23	N/A	0	UP		25

24	N/A	1	UP		25

25	N/A	N/A	Right old	1

26	0	N/A	Left Old	27
	1	N/A	Left Old	27

27	0	N/A	Left Old	27
	1	N/A	Left Old	27
	$	N/A	Right Old	28

28	N/A	N/A	Right Old	1

29	N/A	N/A	N/A		N/A

