import { CommunityPageMedia } from '../types/image.ts';

import mealIcon from '../assets/icons/meal.png';
import communityIcon from '../assets/icons/community.png';
import eventsIcon from '../assets/icons/events.png';


const communityPageMedia: CommunityPageMedia = {
    mealIcon: {
        img: mealIcon,
        alt: 'A delicious meal'
    },
    communityIcon: {
        img: communityIcon,
        alt: 'A crowd of people, cooking'
    },
    eventsIcon: {
        img: eventsIcon,
        alt: 'A crowd of people at a cooking event'
    }
}

export {
    communityPageMedia
}