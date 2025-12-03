// import { StaticImageData } from "next/image";

// interface SlideshowImage {
//     img: StaticImageData
//     alt: string
// }

interface SlideshowImage {
    imgUrl: string
    alt: string
}

type CommunityIcon = SlideshowImage;

interface CommunityPageMedia {
    mealIcon: CommunityIcon,
    communityIcon: CommunityIcon,
    eventsIcon: CommunityIcon
}

export {
    type SlideshowImage,
    type CommunityPageMedia
}