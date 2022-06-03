<script>
    import { shapeArray_for_M7 } from "./G1_MA_shapes";
    import { randomCorrect } from "../taskjs/right";
    import { randomWrong } from "../taskjs/wrong";
  
    let ques_Img = "";
    let selectionArray = [
      {s_opt:"yes",s_val:true},
      {s_opt:"no",s_val:false}
    ];
    let user_resp = "";
    let showNext = "none";   
    let showPopUp;
    let c_Ans = false;
    let sArray = shapeArray_for_M7;
  
    function initImgs() {
      c_Ans = null;
      let ques_rIn = Math.floor(Math.random() * sArray.length);
      ques_Img = sArray[ques_rIn].img_src;
      c_Ans = sArray[ques_rIn].symmetric;
      console.log('inside init',{ques_Img})
      console.log('inside init',{c_Ans});
      showPopUp = null;
      showNext = "none";
    }
    initImgs();
    
    function assign_resp(p_Ans) {
      user_resp = p_Ans;
    }
  
    function checkAns() {
      showNext = "inline-block";
      if (user_resp == c_Ans) {
        showPopUp = randomCorrect();
        return;
      } else {
        showPopUp = randomWrong();
      }
    }
  </script>
  
  <!--markup starts here-->
  
  <div>
    <h4>Two-Dimensional Shapes</h4>
    <h5>Does the picture have <strong>Symmetry</strong> or <strong>not</strong></h5>
    <div class='myck'>
      <label for='myck'>
        <img src={ques_Img} alt="" width="30%" />
      </label>
    </div>
    <div>
      <ul>
        {#each selectionArray as item}
          <li>
            <input type="button" on:click={() => assign_resp(item.s_val)} value={item.s_opt}/>
          </li>
        {/each}
      </ul>
      
    </div>
    <br>
    <h5 style=" display: {showNext};" class="mt-5">{showPopUp}</h5>
    
    <div>
      <button type="button" class="btn rerun" on:click={() => checkAns()}
        >Submit</button
      >
      <button type="button" class="btn rerun" on:click={() => initImgs()}
        >Rerun</button
      >
    </div>
    <p>the correct answer is {c_Ans}</p>
  </div>
  
  <style>
    img {
      width: 190px;
      transition-duration: 0.2s;
      transform-origin: 50% 50%;
    }
  </style>
  