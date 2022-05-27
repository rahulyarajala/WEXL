<script>
  import {onMount} from "svelte"
  import { randomCorrect } from "../taskjs/right";
  import { randomWrong } from "../taskjs/wrong";

  let showNext = "none";
  let showPopUp;
  let ques_Shape = ["Square", "Triangle", "Rectangle", "Circle"];
  let qrn_In = 0;
  let rn_for_US = [];
  let selectionArray = [
    { sname: "", s_img: "", s_Status: false},
    { sname: "", s_img: "", s_Status: false},
    { sname: "", s_img: "", s_Status: false},
    { sname: "", s_img: "", s_Status: false},
  ];
  let answer = false; 
  let sArray = [
    {s_Id: "s_0",shape:"Square", img_src:"images/shapes/box_with_red_square.png"},
    {s_Id: "s_1",shape:"Square", img_src:"images/shapes/box_with_blue_square.png"},
    {s_Id: "s_2",shape:"Square", img_src:"images/shapes/box_with_green_square.png"},
    {s_Id: "s_3",shape:"Square", img_src:"images/shapes/box_with_yellow_square.png"},
    {s_Id: "s_4",shape:"Square", img_src:"images/shapes/box_with_pink_square.png"},
    {s_Id: "s_5",shape:"Square", img_src:"images/shapes/box_with_white_square.png"},
    {s_Id: "s_6",shape:"Square", img_src:"images/shapes/box_with_black_square.png"},
    {s_Id: "s_7",shape:"Triangle", img_src:"images/shapes/box_with_red_triangle.png"},
    {s_Id: "s_8",shape:"Triangle", img_src:"images/shapes/box_with_blue_triangle.png"},
    {s_Id: "s_9",shape:"Triangle", img_src:"images/shapes/box_with_green_triangle.png"},
    {s_Id: "s_10",shape:"Triangle", img_src:"images/shapes/box_with_yellow_triangle.png"},
    {s_Id: "s_11",shape:"Triangle", img_src:"images/shapes/box_with_pink_triangle.png"},
    {s_Id: "s_12",shape:"Triangle", img_src:"images/shapes/box_with_white_triangle.png"},
    {s_Id: "s_13",shape:"Triangle", img_src:"images/shapes/box_with_black_triangle.png"},
    {s_Id: "s_14",shape:"Rectangle", img_src:"images/shapes/box_with_red_rectangle.png"},
    {s_Id: "s_15",shape:"Rectangle", img_src:"images/shapes/box_with_blue_rectangle.png"},
    {s_Id: "s_16",shape:"Rectangle", img_src:"images/shapes/box_with_green_rectangle.png"},
    {s_Id: "s_17",shape:"Rectangle", img_src:"images/shapes/box_with_yellow_rectangle.png"},
    {s_Id: "s_18",shape:"Rectangle", img_src:"images/shapes/box_with_pink_rectangle.png"},
    {s_Id: "s_19",shape:"Rectangle", img_src:"images/shapes/box_with_white_rectangle.png"},
    {s_Id: "s_20",shape:"Rectangle", img_src:"images/shapes/box_with_black_rectangle.png"},
    {s_Id: "s_21",shape:"Circle", img_src:"images/shapes/box_with_red_circle.png"},
    {s_Id: "s_22",shape:"Circle", img_src:"images/shapes/box_with_blue_circle.png"},
    {s_Id: "s_23",shape:"Circle", img_src:"images/shapes/box_with_green_circle.png"},
    {s_Id: "s_24",shape:"Circle", img_src:"images/shapes/box_with_yellow_circle.png"},
    {s_Id: "s_25",shape:"Circle", img_src:"images/shapes/box_with_pink_circle.png"},
    {s_Id: "s_26",shape:"Circle", img_src:"images/shapes/box_with_white_circle.png"},
    {s_Id: "s_27",shape:"Circle", img_src:"images/shapes/box_with_black_circle.png"}
  ];

  function initImgs() {
    // random shape identified
    qrn_In = Math.floor(Math.random() * ques_Shape.length);
    //making the the false null for every reinitialization
    answer = false;
    //randomly fill 4 choices for user to select
    for (let i = 0; i < selectionArray.length; i++) {   
      rn_for_US[i] = Math.floor(Math.random() * sArray.length);
      selectionArray[i].s_img = sArray[rn_for_US[i]].img_src;
      selectionArray[i].sname = sArray[rn_for_US[i]].shape;
    };

    //check to see if the question shape is present in user selection
    // if not, it must be added
    //console.log('before shape present count')
    let shp_present_cnt = 0;
    for (let i = 0; i < selectionArray.length; i++) {     
      if (selectionArray[i].shape == ques_Shape[qrn_In]) {
        shp_present_cnt++;
      };
    };
    
    // answer not found in selection
          
    if (shp_present_cnt == 0) {
      //console.log("in shp_count",{shp_present_cnt});
      let rn1 = Math.floor(Math.random() * selectionArray.length); //random item to be changed in selection items
      // random item to be used as an answer from the source of shapes
      let rn2 = Math.floor(Math.random() * sArray.filter(sItem => {return sItem.shape.includes(ques_Shape[qrn_In])}).length);  
      //console.log("length of filtered array", sArray.filter(sItem => {return sItem.shape.includes(ques_Shape[qrn_In])}).length);
      //console.log('shape present geerated random numbers',{rn},{rn2})
      //replace one of the selections with the required answer so that user may find answer in selection
      selectionArray[rn1].s_img = sArray.filter(sItem => {return sItem.shape.includes(ques_Shape[qrn_In])})[rn2].img_src;
      selectionArray[rn1].sname = sArray.filter(sItem => {return sItem.shape.includes(ques_Shape[qrn_In])})[rn2].shape;
    }

    showPopUp = null;
    showNext = "none";
  }
  initImgs();

  function result() {
    console.log('inside result')
    for(let i=0;i<selectionArray.length;i++){
      console.log('inside of for in result ');
      if(selectionArray[i].s_Status == true){
        console.log('if checked')
        if(selectionArray[i].sname == ques_Shape[qrn_In]){
          answer = true;
          console.log('if matched answer = ',{answer})
        }
        else{
          answer = false;
          console.log('wrong answer if ans =',{answer})
        }
      }
      else if(selectionArray[i].s_Status == false){
        if(selectionArray[i].sname == ques_Shape[qrn_In]){
          answer = false;
          console.log('wrong answer if ans =',{answer})
        }
      }
    }
    console.log('the final answer after checking is',{answer})
      showNext = "inline-block";
      if (answer == true) {
        showPopUp = randomCorrect();
        return;
      } else {
        showPopUp = randomWrong();
      }
  }
</script>

<div>
  <h4>Two-Dimensional Shapes</h4>
  <h5>Which shape has {ques_Shape[qrn_In] + 's'}</h5>
  <div>
    <ul>
      {#each  selectionArray as item,i }
        <li>
          <input type="checkbox" id={"check" + i} bind:checked={item.s_Status}/>
          <label for={"check" + i}>
            <img src={item.s_img} alt={item.sname} />
          </label>
        </li>
      {/each}
      {#each selectionArray as item,i }
        {#if item.s_Status}
          <p>{selectionArray[i].s_Status}</p>
        {:else}
          <p>{selectionArray[i].s_Status}</p>
        {/if}
      {/each}
      
    </ul>
  </div>
  <br />
  <h5 style=" display: {showNext};" class="mt-5">{showPopUp}</h5>
  <div>
    <button type="button" class="btn rerun" on:click={result}
      >Submit</button
    >
    <button type="button" class="btn rerun" on:click={initImgs}
      >Rerun</button
    >
  </div>
</div>

<style>
  ul {
    list-style-type: none;
  }

  li {
    display: inline-block;
  }

  input[type="checkbox"][id^="check"] {
    display: none;
  }

  label {
    border: 1px solid #fff;
    padding: 10px;
    display: block;
    position: relative;
    margin: 10px;
    cursor: pointer;
  }

  label:before {
    background-color: white;
    color: white;
    content: " ";
    display: block;
    border-radius: 50%;
    border: 1px solid grey;
    position: absolute;
    top: -5px;
    left: -5px;
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 28px;
    transition-duration: 0.4s;
    transform: scale(0);
  }

  label img {
    height: 100px;
    width: 100px;
    transition-duration: 0.2s;
    transform-origin: 50% 50%;
  }

  :checked + label {
    border-color: #ddd;
  }

  :checked + label:before {
    content: "✓";
    background-color: grey;
    transform: scale(1);
  }

  :checked + label img {
    transform: scale(0.9);
    /* box-shadow: 0 0 5px #333; */
    z-index: -1;
  }
</style>
