import beet from './beet.svg';
import carrot from './carrot.svg';
import garlic from './garlic.svg';
import leek from './leek.svg';
import lettuce from './lettuce.svg';
import onion from './onion.svg';
import peas from './peas.svg';
import radish from './radish.svg';
import spinach from './spinach.svg';
import strawberry from './strawberry.svg';
import tomato from './tomato.svg';

const sources = {
    beet: beet,
    carrot: carrot,
    garlic: garlic,
    leek: leek,
    lettuce: lettuce,
    onion: onion,
    pea: peas,
    radish: radish,
    spinach: spinach,
    strawberry: strawberry,
    tomato: tomato
};

function plantImgSrc(plantName) {
    return sources[plantName];
}

export default plantImgSrc;