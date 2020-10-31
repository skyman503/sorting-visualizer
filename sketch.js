
let bg_color = (255, 243, 230);
let nav_color = (255, 218, 179);
let side_color = (191, 191, 191);
let nav_height = 150;
let side_width = 250;
let sizeSlider;
let margin_side;
let margin_vertical;
let w_space;
let max_size;
let amount;
let bubble_sort_button;
let sort_type;
let is_sorting;
let index_i, index_j;
let arr = [];

function setup() {
    createCanvas(windowWidth,windowHeight);
    let nav_height = windowHeight/7;
    let side_width =  windowWidth/7;
    is_sorting = false;
    index_i=0;
    index_j=0;
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
    sizeSlider = createSlider(5, 500, 5);
    sizeSlider.position((windowWidth/5),(nav_height/2));
    fill(0, 0, 0);
    textSize(32);
    text('Data amount', (sizeSlider.x), (nav_height/2)-10);

    //algorithm selection
    bubble_sort_button = createButton('Bubble sort');
    bubble_sort_button.position((side_width/3), (nav_height+50));

    //content
    amount = 10;
    max_size = (windowHeight / 2);
    let r;
    for (let i=0; i < amount; i++){
        r = random(max_size);
        append(arr, r);
    }
    //displaying content
    margin_side = 50;
    margin_vertical = 100;
    w_space = ((windowWidth - (2 * margin_side) - side_width) / amount);

    for(let i=0; i < amount; i++){
        fill(0,0,0);
        rect((side_width  + margin_side + (w_space * i)), (windowHeight - margin_vertical -arr[i]), w_space, arr[i]);
    }

    sizeSlider.input(updateSlider);
    bubble_sort_button.mousePressed(bubbleSort);
}

function updateSlider(){
    if( !is_sorting ){
        amount = sizeSlider.value();
        w_space = ((windowWidth - (2 * margin_side) - side_width) / amount);
        arr.splice(0, arr.length);
        for(let i=0; i < amount; i++){
            let r = random(max_size);
            append(arr,r);
        }
        //console.log(arr);
    }
}

function bubbleSort(){
    sort_type = 1;
    is_sorting = true;
}

function display_bars(){
    background(bg_color);
    //navbar
    fill(nav_color);
    noStroke();
    rect(0,0,windowWidth,nav_height);
    fill(0,0,0);
    textSize(32);
    text('Data amount', (sizeSlider.x), (nav_height/2)-20); 
    //sidebar
    fill(side_color);
    noStroke();
    rect(0,nav_height,side_width, (windowHeight-nav_height));

}


function draw(){
    display_bars();
    frameRate(150);
    //display static
    if( !is_sorting ){
        fill(0,0,0);
        noStroke();
        for(let i=0; i < amount; i++){
            rect((side_width  + margin_side + (w_space * i)), (windowHeight - margin_vertical - arr[i]), w_space, arr[i]);
        }
    }
    else{
        switch(sort_type){
            //bubble sort
            case 1:
                let tmp;
                if( arr[index_j] > arr[index_j+1] ){
                    tmp = arr[index_j];
                    arr[index_j] = arr[index_j+1];
                    arr[index_j+1] = tmp;

                }
                console.log(index_i, index_j)      
                if( index_i < amount){
                    index_j = index_j + 1;
                    if( index_j >= (amount-index_i-1)){
                        index_j = 0;
                        index_i = index_i + 1;  
                    }
                }  else{
                    console.log(arr);
                    index_i = 0;
                    index_j = 0;
                    is_sorting = false;
                }
                fill(0,0,0);
                noStroke();
                for(let i=0; i < amount; i++){
                    if(( i == index_i ) || (i == index_j)){
                        fill(202, 3, 252);
                    }
                    else{
                        fill(0,0,0);
                    }
                    rect((side_width  + margin_side + (w_space * i)), (windowHeight - margin_vertical - arr[i]), w_space, arr[i]);
                }



                break;
        }
    }


}











/*


let yPos = 0;
let arr=[];
let ile=5;
let margin = 200;


function setup() {
  // setup() runs once

  createCanvas(windowWidth, windowHeight);
  frameRate(30);


  for(let i=0; i< 5 ; i++){
	let r = random(windowHeight-50);
	append(arr,r);
}

  for(let i=0; i< 5 ; i++){
	rect(0+(((windowWidth)/5)*i),windowHeight-arr[i],windowWidth/5,arr[i]);
  }


  slider = createSlider(10, 1000,20);

  slider.input(updateSlider);
}
function updateSlider(){
	ile = slider.value();
	arr.splice(0, arr.length);
	for(let i=0; i<ile; i++){
		let r = random(windowHeight-150);
		append(arr,r);
	}
	console.log(arr)
}

function draw() {
	


  background(204);
 
  let c = (255, 204, 0);
  fill(c);
  noStroke();

  for(let i=0; i<ile; i++){
	rect(0+(((windowWidth)/ile)*i),windowHeight-arr[i],windowWidth/ile,arr[i]);
  }
}*/