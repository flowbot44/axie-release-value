import {Axie, ERC1155Token} from './interfaces';

// calculateMaterials.ts
const levels: number[] = [1, 10, 20, 30, 40, 50, 60];
const estimatedMaterials: number[][] = [
    [6, 13, 25, 37.5, 50, 62.5, 75, 87.5],
    [7, 15, 75, 118, 210, 252, 272, 293],
    [9, 20, 100, 157, 280, 336, 362, 390],
    [12, 28, 138, 216, 385, 462, 498, 537],
    [17, 38, 188, 294, 525, 630, 679, 732],
    [19, 44, 219, 343, 613, 735, 792, 854],
    [28, 63, 313, 490, 875, 1050, 1132, 1220]
];

function getPreviousLevel(inputLevel: number): number {
    return levels.reduce((a, b) => (b <= inputLevel && b > a) ? b : a, -Infinity);
}

export function queryMaterials(level: number, breedCount: number): number {
    const previousLevel = getPreviousLevel(level);
    const levelIndex = levels.indexOf(previousLevel);
    return estimatedMaterials[levelIndex][breedCount];
}

export function calculateMaterialValue(axieData: Axie, materialMarketPrice:ERC1155Token[]){
    var ethTotal = 0;
    const totalMaterals = queryMaterials(axieData.axpInfo.level,axieData.breedCount)
    const bodyMats = totalMaterals * .25
    const partMats = totalMaterals * .125
    const bodyPartMat = materialMarketPrice.filter(token => token.attributes.class === axieData.class)
    ethTotal += bodyPartMat[0].minPrice * bodyMats
    


    ethTotal += axieData.parts.reduce((sum, partClass) => {
        const matchingTokens = materialMarketPrice.filter(token => token.attributes.class === partClass.class);
        const partClassSum = matchingTokens.reduce((subSum, token) => subSum + token.minPrice * partMats, 0);
        return sum + partClassSum ;
    }, 0);
    return +(ethTotal / Math.pow(10, 18)).toFixed(5)
}

