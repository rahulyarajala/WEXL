<script>
  import { randomCorrect } from "../taskjs/right";
  import { randomWrong } from "../taskjs/wrong";

  let user_resp = null;
  let showNext = "none";
  let showPopUp;
  let ques_Array = ["more", "less"];
  let qIn = 0;

  let rnIn = [];
  let sImg = [];
  let c_Ans = 0;
  let def_ans = '';
  let sArray = [
    { sides: 4, img_src: "images/shapes/blackSquare.png" },
    { sides: 4, img_src: "images/shapes/blackRectangle.png" },
    { sides: 3, img_src: "images/shapes/blackTriangle.png" },
    { sides: 6, img_src: "images/shapes/blackHexagon.png" },
    { sides: 8, img_src: "images/shapes/blackOctagon.png" },
    { sides: 5, img_src: "images/shapes/blackPentagon.png" },
  ];

  function initImgs() {
    c_Ans = null;
    user_resp = null;
    qIn = Math.floor(Math.random() * ques_Array.length);
    for (let i = 0; i < ques_Array.length; i++) {
        do{
            rnIn[i] = Math.floor(Math.random() * sArray.length);
            sImg[i] = sArray[rnIn[i]].img_src;
        }
        while(rnIn[i] == rnIn[i-1]);
    }
    //rnIn = Math.floor(Math.random() * sArray.length);
    //sImg = sArray[rnIn].img_src;
    //c_Ans = ques_Array[qIn];
    def_ans = assign_Ans();
    c_Ans = def_ans;
    //showPopUp = null;
    showNext = "none";
    //console.log("hi");
  }
  initImgs();

  function assign_resp(p_Ans) {
    user_resp = p_Ans;
  }
  
  function assign_Ans() {
    if (ques_Array[qIn] == ques_Array[0]){
        if(sArray[rnIn[0]].sides >  sArray[rnIn[1]]){
            c_Ans = sArray[rnIn[0]].sides;
        }
        else{
            c_Ans = sArray[rnIn[1]].sides;
        }
    }
    else {
        if(sArray[rnIn[0]].sides <  sArray[rnIn[1]]){
            c_Ans = sArray[rnIn[0]].sides;
        }
        else{
            c_Ans = sArray[rnIn[1]].sides;
        }
    }
  }
  function checkAns() {
    //user_resp = p_Ans ;
    console.log("ans check: ", user_resp);
      showNext = "inline-block";
      if (user_resp == c_Ans) {
        //def_ans = true;
        showPopUp = randomCorrect();
        return;
      } else {
        //def_ans = true;
        showPopUp = randomWrong();
      }
     
  }
</script>

<div>
  <h4>Two-Dimensional Shapes</h4>
  <h5>Which shape has {ques_Array[qIn]} sides?</h5>

  <div>
    <ul>
      <li>
        <input type="checkbox" id="mycheck1" />
        <label for="mycheck1">
          <img src={sImg[0]} alt="shape" />
        </label>
      </li>
      <li>
        <input type="checkbox" id="mycheck2" />
        <label for="mycheck2">
          <img src={sImg[1]} alt="shape" />
        </label>
      </li>
      <li>
    </ul>
  </div>
  <br />
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
  ul {
    list-style-type: none;
  }

  li {
    display: inline-block;
  }

  input[type="checkbox"][id^="mycheck"] {
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
