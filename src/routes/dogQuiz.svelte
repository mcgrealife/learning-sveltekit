<script>
  // import {fetchRandomDog} from '../stores/store.js';
  //   import { dogImages } from "src/stores/store";
  import supabase from "$lib/db";
  import { v4 as uuidv4 } from "uuid";
  import { spring } from "svelte/motion";
  import { slide } from "svelte/transition";

  // supabase https://sjorswijsman.medium.com/setting-up-supabase-with-sveltekit-f6234fa1b54b

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
  let randomDogs = fetchRandomDog(3);



  let clickhandler = () => {
    randomDogs = fetchRandomDog(3);
  };

  let imageSelectedThisRound = false;

  let breedClicked = "";

  let imageSelect = async (e) => {
    const { data, error } = await supabase
      .from("favDogs")
      .insert([{ 
        favDogImgUrl: e.target.currentSrc,
        breed: e.target.alt
       }]);
    if (error) throw new Error(error.message);

    imageSelectedThisRound = true;
    breedClicked = e.target.alt;
  };

  let woofHovered = false;

  function toggleWoof() {
    woofHovered = !woofHovered;
  }

  let buttonText = "Get new batch of dogs!";

  let buttonTextToggle = true;

  function hoverButtonText() {
    if (buttonTextToggle) {
      buttonText = "who wants a treat?!";
      buttonTextToggle = !buttonTextToggle;
    } else {
      buttonText = "who wants a W.A.L.K.?!";
      buttonTextToggle = !buttonTextToggle;
    }
  }

  function resetButtonText() {
    buttonText = "Get new batch of dogs!";
  }
</script>

<h1>Pick your favorite dog!</h1>
{#await randomDogs}
  <!-- <p>who wants to go on a walk?!</p> -->
  <h1>🐾</h1>
  <h1>🐾🐾</h1>
  <h1>🐾🐾🐾</h1>
{:then randomDogs2}
  <div class="image-grid">
    {#each randomDogs2 as dog (dog.id)}
      <img class="image" src={dog.url} alt={dog.breed} on:click={imageSelect} />
    {/each}
  </div>
{/await}

{#if imageSelectedThisRound}
  <h1
    in:slide={{ duration: 1000 }}
    on:mouseenter={toggleWoof}
    on:mouseleave={toggleWoof}
  >
    {#if woofHovered} BORK!{:else}WOOF!{/if} You 💞 {breedClicked}
  </h1>

  <!-- make hearts float -->
  <button
    class="btn"
    on:click={clickhandler}
    on:mouseenter={hoverButtonText} 
    on:mouseleave={resetButtonText}>{buttonText}</button
  >
{/if}

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

  .image:hover {
    transform: scale(0.9);
  }

  .btn {
    border: none;
    background-color: thistle;
    font-size: 35px;
  }
  .btn:hover {
    transform: scale(1.1);
    /* hearts fly on hover */
  }

  .woof {
  }
</style>
