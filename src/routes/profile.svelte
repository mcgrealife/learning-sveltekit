<svelte:head>
	<title>Profile</title>
</svelte:head>


<script>
import supabase from "$lib/db";



async function getFavDogs() {
   const { data, error } = await supabase
     .from('favDogs')
     .select()
   if (error) throw new Error(error.message)

   return data
 }


 function getOccurences(array, value) {
	 var count = 0;
	 array.forEach((v) => (v.breed === value && count++))
	 return count;
 }

</script>



{#await getFavDogs()}
	<h1>Fetching your favorite dogs! 🐕</h1>
{:then dogs} 
<h1>Your favorite breeds</h1>
{#each dogs as dog (dog.id)}
<li>{dog.breed}: {getOccurences(dogs, dog.breed)}</li>
{/each}
<div class="imageGrid">
{#each dogs as dog (dog.id)}

	<img class="image" src={dog.favDogImgUrl} alt={dog.id}>

{/each}
</div>
	
{/await}

<style>

	.image {
		max-width: 50%;
		}
.imageGrid {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}

li {
	list-style: url('dog.svg');
}

</style>