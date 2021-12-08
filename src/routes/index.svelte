<!-- <script context="module">
    export const prerender = true
</script> -->

<script>
	import {dogImages, breedsList, breed} from '../stores/store.js';
	import {scale} from 'svelte/transition';
	
	const handleChange = () => {
	breed.update(selectValue)
	}

	$: selectValue = breed
</script>


<svelte:head>
	<title>The now</title>
</svelte:head>

<h1>SvelteDogs</h1>

<div class="picker">
	<h3>select dog breed: </h3>
	<p>{selectValue}</p>
	<select class="breed-select" bind:value={selectValue} on:change={handleChange}>
		<option value={selectValue}>{selectValue}</option>
		{#each breedsList as breed (breed.id)}
		<option value={breed.name}>{breed.name}</option>
		{/each}
	</select>
</div>

<!-- image list is generating twice -->
<div class="images">
	{#each $dogImages as image (image.id)}
	<img src={image.url} width='200' alt="dogImage" in:scale />
{/each}
</div>

<style>
	.breed-select {
		color: white;
		background-color: grey;
	}
	.images {
		/* align-items: flex-start;
		border: 1px white solid; */
	}
	.picker {
		display: flex;
		justify-content: space-between;
	}
</style>