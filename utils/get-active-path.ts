import { closest } from "fastest-levenshtein";

export const getActivePath = (
    path: string,
    paths: string[],
    igonrePaths?: string[]
) => {
    const closestPath = closest(path, paths.concat(igonrePaths || []));
    const index = paths.indexOf(closestPath);

    return { activeIndex: index, activePath: closestPath };
};