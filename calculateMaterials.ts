import {Axie, AxpCocoItem, CraftingData, CraftingItem, ERC1155Token, GachaData} from './interfaces';
import Crafting from './pages/crafting';
import Gacha from './pages/garuda';

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
    return levels.reduce((maxLevel, currentLevel) => 
        (currentLevel <= inputLevel && currentLevel > maxLevel) ? currentLevel : maxLevel, 
        -Infinity
    );
}

export function queryMaterials(level: number, breedCount: number): number {
    const previousLevel = getPreviousLevel(level);
    const levelIndex = levels.indexOf(previousLevel);
    return estimatedMaterials[levelIndex][breedCount];
}

export function queryMaterialsAxie(axie:Axie): number {
    const axieMatLvl = axie.axpInfo.shouldAscend ? axie.axpInfo.level + 1 : axie.axpInfo.level
    return queryMaterials(axieMatLvl,axie.breedCount)
}

export function calculateMaterialValue(axieData: Axie, materialMarketPrice: ERC1155Token[]) {
    let ethTotal = 0;
    const totalMaterials = queryMaterialsAxie(axieData)
    const bodyMats = totalMaterials * .25
    const partMats = totalMaterials * .125
    const materialPriceMap = new Map(materialMarketPrice.map(token => [token.attributes.class, token.minPrice]));
    ethTotal += (materialPriceMap.get(axieData.class) || 0) * bodyMats

    ethTotal += axieData.parts.reduce((sum, partClass) => {
        const matchingTokens = materialMarketPrice.filter(token => token.attributes.class === partClass.class);
        const partClassSum = matchingTokens.reduce((subSum, token) => subSum + token.minPrice * partMats, 0);
        return sum + partClassSum;
    }, 0);
    return ethDecimalFormat(ethTotal)
}

function ethDecimalFormatUsd(ethTotal: number,ethUsdPrice:number){
    return ethToUsd(ethDecimalFormat(ethTotal), ethUsdPrice)
}

export function ethDecimalFormat(ethTotal: number) : number {
    return ethTotal / Math.pow(10, 18);
}

export function ethToUsd(ethValue: number, ethUsdPrice:number){
    return ethValue * ethUsdPrice
}

export function calculateBasicRollValue(gachaData:GachaData | null){
    if(!gachaData)
        return 0

    const shellOdds = 0.06667
    const basicOdds = 100-shellOdds

    const basicCoco = ethDecimalFormat(gachaData.consumableTokens.results[0].minPrice)
    const shell = ethDecimalFormat(gachaData.materialTokens.results[0].minPrice)
    
    const evPreRoll = ((basicCoco * basicOdds) + (shell * shellOdds))/100

    return ethToUsd(evPreRoll,
    gachaData.exchangeRate.eth.usd)
}


export function calculatePremiumRollValue(gachaData:GachaData | null){
    if(!gachaData)
        return 0
    
    const shellOdds = 0.2
    const basicOdds = 85
    const prizeOdds = 0.0003
    const premiumOdds = 100-basicOdds - shellOdds - prizeOdds
    
    const basicCoco = gachaData.consumableTokens.results[0].minPrice
    const premiumCoco = gachaData.consumableTokens.results[1].minPrice
    const shell = gachaData.materialTokens.results[0].minPrice
    const mysticAxie = gachaData.mysticAxie.results[0].order.currentPrice
    
    const evPreRoll = (
        (basicCoco * basicOdds) + 
        (premiumCoco * premiumOdds) + 
        (shell * shellOdds) + 
        (mysticAxie * prizeOdds)
    )/100
    return ethDecimalFormatUsd(evPreRoll
        /5,
        gachaData.exchangeRate.eth.usd
    )
}

export function calculateCraftingInfo(craftingData:CraftingData | null){
    const items: CraftingItem[] = []
    const premiumCoco = craftingData?.consumableTokens.results.find(item => item.name === "Premium Cocochoco")
    const coco = craftingData?.consumableTokens.results.find(item => item.name === "Cocochoco")
    const superCoco = craftingData?.consumableTokens.results.find(item => item.name === "Super Cocochoco")
    const darkFlame =craftingData?.consumableTokens.results.find(item => item.name === "Dark Flame")

    const plantMemento = craftingData?.materialTokens.results.find(item => item.name === "Plant Memento") 
    const aquaMemento = craftingData?.materialTokens.results.find(item => item.name === "Aquatic Memento")
  
    const ethPrice = craftingData?.exchangeRate.eth.usd

    items.push(createCraftingItem(darkFlame!.name,calculateDarkFlame(plantMemento!,aquaMemento!,premiumCoco!,ethPrice!),ethDecimalFormatUsd(darkFlame!.minPrice,ethPrice!)))
    items.push(createCraftingItem(superCoco!.name,calculateSuperCoco(premiumCoco!,coco!,ethPrice!),ethDecimalFormatUsd(superCoco!.minPrice,ethPrice!)))
    
    return items
}

const createCraftingItem = (name: string, costToMake: number, marketPrice: number): CraftingItem => {
    return {
      name,
      costToMake,
      marketPrice,
      profit: marketPrice - costToMake,
    };
  };

function calculateSuperCoco(premiumCoco: ERC1155Token, coco: ERC1155Token, ethPrice: number): number {
    return ethDecimalFormatUsd(premiumCoco.minPrice *10 + coco.minPrice *40,ethPrice) + 2.5  
}

function calculateDarkFlame(plantMemento: ERC1155Token, aquaMemento: ERC1155Token, premiumCoco: ERC1155Token, ethPrice: number): number {
    return ethDecimalFormatUsd(plantMemento.minPrice *100 + aquaMemento.minPrice *50 + premiumCoco.minPrice*2,ethPrice) + 1.5 

}


export function calcAxpCocoItems(craftingData:ERC1155Token[] | null, ethPrice: number| null){
    const items: AxpCocoItem[] = []
    
    if (!craftingData || !ethPrice) {
        return items
    }
    
    
    const premiumCoco = craftingData?.find(item => item.name === "Premium Cocochoco")
    const coco = craftingData?.find(item => item.name === "Cocochoco")
    const superCoco = craftingData?.find(item => item.name === "Super Cocochoco")

    items.push(createAxpCocoItem(coco!.name,50,ethDecimalFormatUsd(coco!.minPrice,ethPrice)))
    items.push(createAxpCocoItem(premiumCoco!.name,200,ethDecimalFormatUsd(premiumCoco!.minPrice,ethPrice)))
    items.push(createAxpCocoItem(superCoco!.name,15000,ethDecimalFormatUsd(superCoco!.minPrice,ethPrice)))
    
    return items
}

const createAxpCocoItem = (name: string, axp: number, marketPrice: number): AxpCocoItem => {
    return {
      name,
      axp,
      marketPrice,
      pricePerAxp: marketPrice / axp * 50,
    };
  };