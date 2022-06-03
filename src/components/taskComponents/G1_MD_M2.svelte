<script>
  import { shapeArray } from "./G1_MA_shapes"
  import { randomCorrect } from "../taskjs/right";
  import { randomWrong } from "../taskjs/wrong";

  let showNext = "none";
  let showPopUp;
  let ques_Shape = ["Square", "Triangle", "Rectangle", "Circle"];
  let qrn_In = 0;
  let rn_for_US = [];
  let selectionArray = [
    { s_opt:"", s_img: "", opt_eval: null, s_Status: false},
    { s_opt:"", s_img: "", opt_eval: null, s_Status: false},
    { s_opt:"", s_img: "", opt_eval: null, s_Status: false},
    { s_opt:"", s_img: "", opt_eval: null, s_Status: false},
  ]; 
  let sArray = shapeArray;
  let cAns_cnt = 0;
  let user_resp_cnt = 0;
  function initImgs() {
    user_resp_cnt = 0;
    cAns_cnt = 0;
    // random shape identified
    qrn_In = Math.floor(Math.random() * ques_Shape.length);
    //making the the false null for every reinitialization
    
    //randomly fill 4 choices for user to select
    for (let i = 0; i < selectionArray.length; i++) {   
      rn_for_US[i] = Math.floor(Math.random() * sArray.length);
      selectionArray[i].s_img = sArray[rn_for_US[i]].img_src;
      selectionArray[i].s_opt = sArray[rn_for_US[i]].s_name;
    };
    //check to see if the question shape is present in user selection
    // if not, it must be added
    let shp_present_cnt = 0;
    for (let i = 0; i < selectionArray.length; i++) {     
      if (selectionArray[i].s_name == ques_Shape[qrn_In]) {
        shp_present_cnt++;
      };
    };
    // answer not found in selection   
    if (shp_present_cnt == 0) {
      //console.log("in shp_count",{shp_present_cnt});
      let rn1 = Math.floor(Math.random() * selectionArray.length); //random item to be changed in selection items
      // random item to be used as an answer from the source of shapes
      let rn2 = Math.floor(Math.random() * sArray.filter(sItem => {return sItem.s_name.includes(ques_Shape[qrn_In])}).length);  
      //console.log("length of filtered array", sArray.filter(sItem => {return sItems_name.includes(ques_Shape[qrn_In])}).length);
      //console.log('shape present geerated random numbers',{rn},{rn2})
      //replace one of the selections with the required answer so that user may find answer in selection
      selectionArray[rn1].s_img = sArray.filter(sItem => {return sItem.s_name.includes(ques_Shape[qrn_In])})[rn2].img_src;
      selectionArray[rn1].s_opt = sArray.filter(sItem => {return sItem.s_name.includes(ques_Shape[qrn_In])})[rn2].s_name;
    }

    showPopUp = null;
    showNext = "none";
  }
  initImgs();

  function result() {
    user_resp_cnt = 0;
    cAns_cnt = 0;
    console.log('inside result')
    for(let i=0;i<selectionArray.length;i++){
      //count of crt answers displayed
      if(selectionArray[i].s_opt == ques_Shape[qrn_In]){
        cAns_cnt++;
        //console.log("dis cnt value",cAns_cnt)
      }
      if(selectionArray[i].s_opt == ques_Shape[qrn_In]){
        if(selectionArray[i].s_Status == true){
          user_resp_cnt++;
        }
      }
      //  if(selectionArray[i].s_Status == true){
      //    console.log('if checked')
      //    if(selectionArray[i].s_opt == ques_Shape[qrn_In]){
      //      answer = true;
      //      console.log('if matched answer = ',{answer})
      //    }
      //    else{
      //      answer = false;
      //      console.log('wrong answer if ans =',{answer})
      //    }
      //  }
      //  else if(selectionArray[i].s_Status == false){
      //    if(selectionArray[i].s_opt == ques_Shape[qrn_In]){
      //      answer = false;
      //      console.log('wrong answer if ans =',{answer})
      //    }
      //  }
     }
     console.log("dis cnt value",cAns_cnt)
     console.log("user cnt value",user_resp_cnt)
    
    
      showNext = "inline-block";
      if (user_resp_cnt == cAns_cnt) {
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
            <img src={item.s_img} alt={item.s_opt} />
            <p>{item.s_opt}</p>
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
    <p>the user resp is {cAns_cnt}</p>
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
