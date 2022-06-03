<script>
  import { shapeArray } from "./G1_MA_shapes"
  import { randomCorrect } from "../taskjs/right";
  import { randomWrong } from "../taskjs/wrong";

  let showNext = "none";
  let showPopUp;
  let ques_Array = ["more","fewer"];
  let qrn_In = 0;
  let rn_for_US = [];
  let selectionArray = [
    { s_optVal: 0, s_img: ""},
    { s_optVal: 0, s_img: ""},
  ];
  let c_Ans = 0; 
  let user_resp = 0;
  let sArray = shapeArray;
  function initImgs() {
    // random shape identified
    c_Ans = 0;
    user_resp = 0;
    qrn_In = Math.floor(Math.random() * ques_Array.length);
    //making the the false null for every reinitialization
    //randomly fill 4 choices for user to select
    for (let i = 0; i < selectionArray.length; i++) {   
      rn_for_US[i] = Math.floor(Math.random() * sArray.length);
      selectionArray[i].s_img = sArray[rn_for_US[i]].img_src;
      selectionArray[i].s_optVal = sArray[rn_for_US[i]].sides;
    };
    //for assigning the correct answer
    for(let i=0;i<selectionArray.length;i++){
      if (ques_Array[qrn_In] == ques_Array[0]){
        if(selectionArray[0].s_optVal >  selectionArray[1].s_optVal){
          c_Ans = selectionArray[0].s_optVal;
        }
        else{
          c_Ans = selectionArray[1].s_optVal;
        }
      }
      else {
        if(selectionArray[0].s_optVal <  selectionArray[1].s_optVal){
          c_Ans = selectionArray[0].s_optVal;
        }
        else{
          c_Ans = selectionArray[1].s_optVal;
        }
      }
    }
    showPopUp = null;
    showNext = "none";
  }
  initImgs();
  
  function assign_resp(resp){
    user_resp = resp;
  }
  function result(resp) {    
    //console.log('inside result')
    //console.log('user resp is',{user_resp})
    //console.log('crt answer is',c_Ans)
    showNext = "inline-block";
    if (user_resp == c_Ans) {
      showPopUp = randomCorrect();
      return;
    } else {
      showPopUp = randomWrong();
    }
  }
</script>

<div>
  <h4>Two-Dimensional Shapes</h4>
  <h5>Which shape has {ques_Array[qrn_In]} sides</h5>
  <div>
    <ul>
      {#each  selectionArray as item, i }
        <li>
          <button id={"check" + i} on:click={assign_resp(selectionArray[i].s_optVal)}>
          <label for={"check" + i}>
            <img src={item.s_img} alt={item.s_optVal} />
            <!-- <p>{item.s_opt}</p> -->
          </label>
          </button>
        </li>
      {/each}
      <p>{user_resp}</p>
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
    <p>the user resp is {user_resp}</p>
    <p>the correct answer is {c_Ans}</p>
  </div>
</div>

<style>
  ul {
    list-style-type: none;
  }

  li {
    display: inline-block;
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

  

  :checked + label img {
    transform: scale(0.9);
    /* box-shadow: 0 0 5px #333; */
    z-index: -1;
  }
</style>
