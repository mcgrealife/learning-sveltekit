<script>
  // import {fetchRandomDog} from '../stores/store.js';
//   import { dogImages } from "src/stores/store";
import { v4 as uuidv4 } from "uuid";
import Future from "./future.svelte";

  

  const fetchRandomDog = async (num) => {
    const url = "https://dog.ceo/api/breeds/image/random/" + num;
    const res = await fetch(url);
    const data = await res.json();
    const loadedDogs = data.message.map((image) => {
      const breed = image.substring(
        image.indexOf("breeds/") + 7,
        image.lastIndexOf("/")
      );
      return {
        id: { uuidv4 },
        url: image,
        breed: breed,
      };
    });
    return loadedDogs;
    
  };
  let randomDogs = fetchRandomDog(3)


  let clickhandler = () => {
    randomDogs = fetchRandomDog(3);
  };
  
  let imageSelect = (e) => {
    
    // save this to user profile e.target.currentSrc
  }

</script>

<button class="btn" on:click={clickhandler}>Get new batch of dogs!</button>
{#await randomDogs}
<p>who wants to go on a walk?!</p>
{:then randomDogs2}
<div class="image-grid">
    {#each randomDogs2 as dog (dog.id)}
    <img class="image" src={dog.url} alt="random-dog" on:click={imageSelect}/>
    {/each}
</div>
{/await}

<style>

    .image-grid {
        display: flex;
        /* flex-direction: row; */
        flex-wrap: wrap;
        /* align-content: flex-start; */
    }
    .image {
        max-width: 50%;
    }

    .btn {
        border: none;
        background-color: thistle;
    }
</style>
