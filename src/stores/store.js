import { writable } from "svelte/store";
import { v4 as uuidv4 } from 'uuid';


export const dogImages = writable([]);

export let breedsList = [];
export const breed = 'hound'
let limit = 3

export const fetchDogs = async (breed) => {
    const url = 'https://dog.ceo/api/breed/' + breed + '/images/random/' + limit;
    const res = await fetch(url);
    const data = await res.json();
    const loadedDogs = data.message.map(image => {
        return {
            id: { uuidv4 },
            url: image
        }
    }
    )
    dogImages.set(loadedDogs)
}
fetchDogs(breed);

export const fetchRandomDog = async (num) => {
    const url = 'https://dog.ceo/api/breeds/image/random/' + num;
    const res = await fetch(url);
    const data = await res.json();
    const loadedDogs = data.message.map(image => {
        const breed = image.substring(
            image.indexOf('breeds/')+7,
            image.lastIndexOf('/')
        );
        return {
            id: { uuidv4 },
            url: image,
            breed: breed
        }
    }
    )
    return loadedDogs
    // randomDogImages.set(loadedDogs)

}
// fetchRandomDog();


const fetchBreeds = async () => {
    const url = 'https://dog.ceo/api/breeds/list/all';
    const res = await fetch(url);
    const data = await res.json();
    const loadedBreeds = Object.keys(data.message)
    breedsList = loadedBreeds.map(breed => {
        return {
            id: { uuidv4 },
            name: breed
        }
    }
    )
}
fetchBreeds();

