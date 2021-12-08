<!-- <script context="module">
    export const prerender = true
</script> -->

<script>
	import {dogImages, breedsList, fetchDogs} from '../stores/store.js';
	import {scale} from 'svelte/transition';

	let selected

	const handleChange = () => {
		fetchDogs(selected)
	}
	
</script>


<svelte:head>
	<title>The now</title>
</svelte:head>

<h1>SvelteDogs</h1>
<h3 style="background-color: teal">Getting dogs from the dogs API</h3>

<div class="picker">
	<h3>Select breed: </h3>
	
	<select bind:value={selected} class="breed-select" on:change={handleChange}>

		{#each breedsList as breed (breed.id)}
		<option value={breed.name}>{breed.name}</option>
		{/each}
	</select>
</div>

<!-- image list is generating twice on refresh for some reason. is it because svelte deliveres the previously rendered page? It's always the same 3 images delivered-->
<div >
	{#each $dogImages as image (image.id)}
	<img src={image.url} width='200' alt="dogImage" in:scale />
	{/each}
</div>

<style>
	.breed-select {
		color: white;
		background-color: grey;
	}

	.picker {
		display: flex;
		
	}
</style>