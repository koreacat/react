export enum MapType {
    space,
    land,
    rock,
    thorn,
    goal,
    spikeTrap,
    skelleton,
}

const {
    space: SPACE,
    land: LAND,
    rock: ROCK,
    thorn: THORN,
    goal: GOAL,
    spikeTrap: SPIKE_TRAP,
    skelleton: SKELETON,
} = MapType;

export const basicMap = [
    [LAND, SPACE, SPACE, LAND, LAND, LAND],
    [LAND, LAND, LAND, LAND, ROCK, LAND, LAND],
    [SPACE, LAND, SPACE, THORN, LAND, SPACE],
    [LAND, LAND, LAND, LAND, SPIKE_TRAP, LAND],
    [LAND, ROCK, SPIKE_TRAP, SKELETON, SKELETON, SKELETON],
    [THORN, SPACE, LAND, LAND, LAND, GOAL]
]