
let bg_color = (255, 243, 230);
let nav_color = (255, 218, 179);
let side_color = (191, 191, 191);
let nav_height = 150;
let side_width = 250;
let sizeSlider, speedSlider;
let margin_side;
let margin_vertical;
let w_space;
let max_size;
let amount;
let bubbleSort_button;
let sort_type;
let is_sorting;
let index_i, index_j;
let sorting_speed;
let promise_counter;
let arr = [];
let states = [];

function setup() {
    createCanvas(windowWidth,windowHeight);
    let nav_height = windowHeight/7;
    let side_width =  windowWidth/7;
    is_sorting = false;
    index_i=0;
    index_j=0;
    sort_type = 0;
    promise_counter = 0;
    sorting_speed = 50;
    background(bg_color);
    //navbar
    fill(nav_color);
    noStroke();
    rect(0,0,windowWidth,nav_height); 
    //sidebar
    fill(side_color);
    noStroke();
    rect(0,nav_height,side_width, (windowHeight-nav_height));
  
    //slider
    sizeSlider = createSlider(10, 500, 10);
    sizeSlider.position((windowWidth/5),(nav_height/2));
    speedSlider = createSlider(1, 150, 50);
    speedSlider.position(((windowWidth/5)*2),(nav_height/2));
    fill(0, 0, 0);
    textSize(32);
    text('Size', (sizeSlider.x), (nav_height/2)-10);
    text('Speed', (speedSlider.x), (nav_height/2)-10);

    //algorithm selection
    bubbleSort_button = createButton('Bubblesort');
    bubbleSort_button.position((side_width/3), (nav_height+50));
    quickSort_button = createButton("Quicksort");
    quickSort_button.position((side_width/3), (nav_height+100));

    //content
    amount = 10;
    max_size = (windowHeight / 2);
    let r;
    for (let i=0; i < amount; i++){
        r = random(max_size);
        append(arr, r);
        append(states, -1);
    }
    //displaying content
    margin_side = 50;
    margin_vertical = 100;
    w_space = ((windowWidth - (2 * margin_side) - side_width) / amount);

    for(let i=0; i < amount; i++){
        fill(0,0,0);
        rect((side_width  + margin_side + (w_space * i)), (windowHeight - margin_vertical -arr[i]), w_space, arr[i]);
    }

    sizeSlider.input(updateSizeSlider);
    speedSlider.input(updateSpeedSlider);
    bubbleSort_button.mousePressed(function() {if(!is_sorting){chooseSort(1);}});
    quickSort_button.mousePressed(function() {if(!is_sorting){chooseSort(2);}});
}

function updateSpeedSlider(){
    if( !is_sorting ){
        sorting_speed = speedSlider.value();
    }
}

function updateSizeSlider(){
    if( !is_sorting ){
        amount = sizeSlider.value();
        w_space = ((windowWidth - (2 * margin_side) - side_width) / amount);
        arr.splice(0, arr.length);
        for(let i=0; i < amount; i++){
            let r = random(max_size);
            append(arr,r);
            append(states, -1);
        }
        //console.log(arr);
    }
}

function chooseSort(i){
    sort_type = i;
    switch(sort_type){
        case 1:
            is_sorting = true;
            reset_states();
            buubleSort();
            break;
        case 2:
            is_sorting = true;
            reset_states();
            quickSort(0, arr.length-1);
            break;
    }
    
    
}

function reset_states(){
    for(let i=0; i<amount;i++){
        states[i] = -1;
    }
}

async function swap(a, b) {
    await sleep(sorting_speed);
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function display_bars(){
    background(bg_color);
    //navbar
    fill(nav_color);
    noStroke();
    rect(0,0,windowWidth,nav_height);
    fill(0,0,0);
    textSize(32);
    text('Size', (sizeSlider.x), (nav_height/2)-20); 
    text('Speed', (speedSlider.x), (nav_height/2)-20); 
    //sidebar
    fill(side_color);
    noStroke();
    rect(0,nav_height,side_width, (windowHeight-nav_height));

}
async function buubleSort(){
    let swapped;
    for(let i=0; i < (arr.length-1); i++){
        swapped = false;
        for(let j=0; j < (arr.length-i-1); j++){
            reset_states();
            states[j] = 1;
            states[j+1] = 1;
            if(arr[j] > arr[j + 1]){
                await swap(j, (j+1));
                swapped = true;
            }
        }
        if (swapped = false){
            break;
        }
    }
    is_sorting=false;
    sort_type = 0;
}

async function quickSort(start, end) {
    if (start >= end) {
        return;
    }
    let index = await partition(start, end);
    states[index] = -1;
  
    await Promise.all([
      quickSort(start, index - 1),
      quickSort(index + 1, end),
      promise_counter = promise_counter + 1
    ]);
    promise_counter = promise_counter - 1;
    if(promise_counter == 0){
        is_sorting = false;
        sort_type = 0;
    }
}
  
async function partition(start, end) {
    for (let i = start; i <= end; i++) {
      states[i] = 1;
    }
    let pivotValue = arr[end];
    let pivotIndex = start;
    states[pivotIndex] = 0;
    for (let i = start; i < end; i++) {
      if (arr[i] < pivotValue) {
        await swap(i, pivotIndex);
        states[pivotIndex] = -1;
        pivotIndex++;
        states[pivotIndex] = 0;
      }
    }
    await swap(pivotIndex, end);
    for (let i = start; i <= end; i++) {
      if (i != pivotIndex) {
        states[i] = -1;
      }
    }
    return pivotIndex;
}

function draw(){
    display_bars();
    switch(sort_type){
        case 0:
            for (let i = 0; i < arr.length; i++) {
                noStroke();
                fill(0,0,0);
                rect((side_width  + margin_side + (w_space * i)), (windowHeight - margin_vertical - arr[i]), w_space, arr[i]);
            }
            break;
        case 1:
            for (let i = 0; i < arr.length; i++) {
                noStroke();
                if(states[i] == 1){
                    fill(202, 3, 252);
                }else{
                fill(0,0,0);}
                rect((side_width  + margin_side + (w_space * i)), (windowHeight - margin_vertical - arr[i]), w_space, arr[i]);
            }
            break;
        case 2:     
            for (let i = 0; i < arr.length; i++) {
                    noStroke();
                if (states[i] == 0) {
                    fill(202, 3, 252);
                } else if (states[i] == 1) {
                    fill(102, 204, 255);
                } else {
                    fill(0,0,0);
                }
                rect((side_width  + margin_side + (w_space * i)), (windowHeight - margin_vertical - arr[i]), w_space, arr[i]);
            }
            break;
    }
}