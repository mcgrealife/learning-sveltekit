<!-- <script context="module">
    export const prerender = true
</script> -->

<script>
	import {dogImages, breedsList, fetchDogs} from '../stores/store.js';
	import {scale} from 'svelte/transition';

	let selected
	const setSelected = async (i) => {

		if (i == undefined) {
			console.log("breedsList is undefined")
			throw new Error("breedsList is undefined");
		} else {

		selected = await i[0].name ?? 'try again'
		console.log(selected)
		}
	}
	setSelected(breedsList)

	console.log(selected)

	const handleChange = () => {
		fetchDogs(selected)
	}


	
</script>


<svelte:head>
	<title>The now</title>
</svelte:head>

<h1>SvelteDogs 🐾</h1>
<h3 style="background-color: teal; color: white">Getting dogs from the 🐕 API</h3>

<div class="picker">
	<h3 style="color: white">Select breed: </h3>
	

	{#await breedsList}
	waiting
	{:then data}
		<select bind:value={selected} class="breed-select" on:change={handleChange}>
			{#each data as breed (breed.id)}
			<option value={breed.name ?? "breedName1"}>{breed.name ?? "BreedName1"}</option>
			{/each}
		</select>
		{:catch error}
			<p>there was an error</p>
	{/await}
	
	
</div>

<!-- image list is generating twice on refresh for some reason. is it because svelte deliveres the previously rendered page? It's always the same 3 images delivered-->
<div >
	{#each $dogImages as image (image.id)}
	<img src={image.url} width='200' alt="dogImage" in:scale />
	{/each}
</div>


<div class="notice">
	<p><i>🚧 If the dropdown isn't showing, navigate to another page and back.🚧</i></p>
</div>
<style>

	.notice {
		/* max-width: 50%; */
		color: silver;
	}
	.breed-select {
		color: white;
		background-color: grey;
	}

	.picker {
		display: flex;
		
	}
</style>