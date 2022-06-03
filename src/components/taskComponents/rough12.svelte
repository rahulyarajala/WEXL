<div class= 'abcd'>
	
	<div>
		<p>Multiples Of Ten</p>

		{#each temp as y}
		<div>
			
				{#each y as x,index}
					<!-- {x.value} -->
					{#if x.show}
					<span >{x.value}</span>
					{/if}
					{#if !x.show}
					<span ><input type="text" bind:value="{x.resp}" maxlength=6>  </span>
					{/if}
					{#if index == 1}
						=
					{/if}
					{#if index == 0}
						+
					{/if}
				{/each}
			
			
		</div>
		{/each}
	
	</div>
	
	
	
	{#if defaultAns}
		{#if answer}
			<p>{crtAns}</p>
		{:else}
			<p>{wrngAns}</p>
		{/if}
	{/if} 
	
	
	
	<button  on:click={submit}>Submit</button>
	<button  on:click={() => Add(ninja,2)}>Next</button>
		
</div>
	
	
<style>
	
	.abcd{
		text-align: center;
		
	}
</style>

<script>
	import {right,wrong} from './wrong.js';
	
	const num1 = 10;
	const num2 = 20;
	let answer = false;
	let defaultAns = false; 
	let ninja = [
		{show:true,value:null,resp:null}, 
		{show:true,value:null,resp:null}, 
		{show:true,value:null,resp:null}
	];
	let temp = [];
	
	let showPopUp ;
	let crtAns ;
	let wrngAns ;
	//let answer ;
	
	
	let resp = null;
	let originalAns = -1;
	
	export function Add(x,noOfIterates) { 
		temp = []
		for(let a of x){
			a.show = true
		}
		
		crtAns= right() 
		wrngAns= wrong() 
		
		resp = null;
		defaultAns = false;

		x[0].value = Math.floor(Math.random() * (num1));
		x[1].value = Math.floor(Math.random() * (num2));

		x[2].value = Math.abs(x[0].value + x[1].value);

		let randomNo = Math.floor(Math.random() * (3));
		ninja[randomNo].show = false;
		originalAns = ninja[randomNo].value;	
		temp.push(x);
		let base = 10;
		for(let y=0;y<noOfIterates;y++){
			let obj = [
				{show:true,value:null}, 
				{show:true,value:null}, 
				{show:true,value:null}
			]
			obj[0].value = parseInt(x[0].value) * base;
			obj[0].show = x[0].show;
			obj[1].value = parseInt(x[1].value) * base;
			obj[1].show = x[1].show;
			obj[2].value = obj[0].value + obj[1].value;
			obj[2].show = x[2].show;
			temp.push(obj)
			base = base * 10;
		}
	}
	Add(ninja,2);

	function submit() {
		for(let x of temp){
			let respObj = x.findIndex(obj => obj.show == false);
			
			// let valueObj = x.map((element, index) => {
			// 				if (element.show === true) {
			// 				return index;
			// 				}
			// 			})
			// 			.filter(element => element >= 0);
			
			if(respObj == 0){
				
				if(parseInt(x[0].resp) + parseInt(x[1].value) === parseInt(x[2].value)){
					defaultAns = true;
					showPopUp = right()
					answer = true;
				}else{
					answer = false;	
					return;
				}
			}else if (respObj == 1){
				
				if(parseInt(x[1].resp) + parseInt(x[0].value) === parseInt(x[2].value)){
					defaultAns = true;
					showPopUp = right();
					answer = true;
					
				}else{
					answer = false;	
					return;
				}
			}else if(respObj == 2){
				if(parseInt(x[0].value) + parseInt(x[1].value) === parseInt(x[2].resp)){
					defaultAns = true;
					showPopUp = right()
					answer = true;
				}else{
					answer = false;	
					return;
				}
			}else{
				defaultAns = true;
				showPopUp = wrong();
				answer = false;
				return;
			}
		}
	}
</script>	