<script>
import {ID_D_G5_MA_EXc221d} from '../allDemoComponents.js';
import EX_AddBase from './Example_AdditionBase.svelte';
import { custActConfig, sc_obj } from  '../taskjs/taskObjDefn.js';
import {EX_G5_MA_C2} from "../demoDir/EXg5c2.js";

export let scObj = sc_obj;
export let actConfig = custActConfig;
let fixed_params =[2, EX_G5_MA_C2[0].params[3][0], EX_G5_MA_C2[0].params[3][1]];

function initAct() {
    actConfig.component_id = ID_D_G5_MA_EXc221d;

    console.log('inside D_G5_MA_EXc221d', ' # of param: ', fixed_params);
};
initAct();
</script>
    
<div class="container mt-5">
    <div class="shadow-sm  bg-white rounded">
        <EX_AddBase {actConfig} {scObj} {fixed_params}/> 
    </div>
</div> 
