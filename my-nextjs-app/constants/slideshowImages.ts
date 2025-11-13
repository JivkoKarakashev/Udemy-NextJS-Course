import { SlideshowImage } from '../types/image.ts';

import burgerImg from '../assets/burger.jpg';
import curryImg from '../assets/curry.jpg';
import dumplingsImg from '../assets/dumplings.jpg';
import macncheeseImg from '../assets/macncheese.jpg';
import pizzaImg from '../assets/pizza.jpg';
import schnitzelImg from '../assets/schnitzel.jpg';
import tomatoSaladImg from '../assets/tomato-salad.jpg';

const slideshowImages: SlideshowImage[] = [
    { img: burgerImg, alt: 'A delicious, juicy burger' },
    { img: curryImg, alt: 'A delicious, spicy curry' },
    { img: dumplingsImg, alt: 'Steamed dumplings' },
    { img: macncheeseImg, alt: 'Mac and cheese' },
    { img: pizzaImg, alt: 'A delicious pizza' },
    { img: schnitzelImg, alt: 'A delicious schnitzel' },
    { img: tomatoSaladImg, alt: 'A delicious tomato salad' },
];

export {
    slideshowImages
}