<script>
    import { randomCorrect } from "../taskjs/right";
    import { randomWrong } from "../taskjs/wrong";
  
    let ques_Img = "";
    let rnIn = 0;
    let user_resp = null ;
    let showPopUp;
    let showNext = "none"; 
    let c_Ans = 0;
    
    
  
    
    let sArray = [
      { sides: 4, img_src: "images/shapes/blackSquare.png" },
      { sides: 4, img_src: "images/shapes/blackRectangle.png" },
      { sides: 3, img_src: "images/shapes/blackTriangle.png" },
      { sides: 6, img_src: "images/shapes/blackHexagon.png" },
      { sides: 8, img_src: "images/shapes/blackOctagon.png" },
      { sides: 5, img_src: "images/shapes/blackPentagon.png" },
    ];
  
    function initImgs() {
      user_resp = null;
      rnIn = Math.floor(Math.random() * sArray.length);
      ques_Img = sArray[rnIn].img_src;
      c_Ans = sArray[rnIn].sides;
      showNext = "none"; 
      //def_ans = false;
      //showPopUp = null;
      console.log("hi");
    }   
    initImgs();
  
    function checkAns() {
      //answer = p_Ans.value ;
      showNext = "inline-block";
      if (user_resp == c_Ans ) {
        def_ans = true;
        showPopUp = randomCorrect();
        return;
      } else {
        def_ans = true;
        showPopUp = randomWrong();
      }
      console.log(user_resp);
    }
    
  </script>
  
  <div>
    <h4>Two-Dimensional Shapes</h4>
    <h5>How many sides does this Shape have ?</h5>
    <div>
      <img src={ques_Img} alt="shapes" width="30%" />
    </div>
    <div>
      <input type="number" bind:value={user_resp} class="btn rnAns" >      
    </div>
    <br>
    <h5 style=" display: {showNext};" class="mt-5">{showPopUp}</h5>
    
    <!--
      {#if def_ans}
      {#if (parseInt(user_resp) === parseInt(c_Ans))}
      <p>{showPopUp }</p>
      {:else}
      <p>{showPopUp}</p>
      {/if}
      {/if}
    -->
    
    <div>
      <button type="button" class="btn toggle-btn" on:click={() => checkAns()}>Submit</button>
      <button type="button" class="btn rerun" on:click={()=>initImgs()}>Rerun</button>
    </div>
    <p>the correct answer is {c_Ans}</p>
  </div>
  