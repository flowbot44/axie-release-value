import React from 'react';
import { Card, Divider, Flex, Link, Text} from '@aws-amplify/ui-react';

import { Axie, ERC1155Token } from '../interfaces';
import { calculateMaterialValue, queryMaterials, queryMaterialsAxie } from '../calculateMaterials'
import {ethDecimalFormat, ethToUsd} from '../calculateMaterials'

interface AxieCardProps {
  axie: Axie;
  ethUsd: number;
  materials: ERC1155Token[];
}

const AxieCard: React.FC<AxieCardProps> = ({ axie, ethUsd, materials }) => {
    const totalMats = queryMaterialsAxie(axie)
    const totalEthCost = calculateMaterialValue(axie,materials)
    var profit  = "sold"
    var price  = "sold"
    var borderStyle = "1 px solid var(--amplify-colors-primary)"
    var axieUrl = `https://app.axieinfinity.com/marketplace/axies/${axie.id}/`
    var percentProfit = 0
    if(axie.order){
     var tempProfit = ethToUsd(totalEthCost - ethDecimalFormat(axie.order.currentPrice),ethUsd) 
     tempProfit = axie.axpInfo.shouldAscend ? tempProfit - .5 : tempProfit
     profit = tempProfit.toFixed(2)
     const tempPrice = ethToUsd(ethDecimalFormat(axie.order.currentPrice),ethUsd)
     price = tempPrice.toFixed(2)
     percentProfit = tempProfit/tempPrice * 100
     if(percentProfit > 0 && percentProfit < 30){
        borderStyle = "5px solid yellow"
     }else if (percentProfit >= 30){
        borderStyle = "5px solid green"
     }
     
    }
  return (
    <Card
      variation="outlined"
      padding="medium"
      backgroundColor="var(--amplify-colors-background-primary)"
      border={borderStyle}
      borderRadius="0.75rem"
      maxWidth="18rem"
      width="100%"
      textAlign="center"
    >
        <Flex direction="column" alignItems="center" gap="small">
            <Link href={axieUrl} target="_blank">
                <Text fontSize="large" fontWeight="bold">{axie.id}</Text>
            </Link> 
            <Divider />
            <Text fontSize="small" color="var(--amplify-colors-font-tertiary)">
                Mats: {totalMats}  Profit: ${profit} %profit: {percentProfit.toFixed(1)}
            </Text>
            <Text fontSize="small" color="var(--amplify-colors-font-tertiary)">
                Ascend?: {axie.axpInfo.shouldAscend  ? 'Ready' : 'Not Ready'} lvl: {axie.axpInfo.level}
            </Text>
            <Text fontSize="small" color="var(--amplify-colors-font-tertiary)">
               Price: {price}
            </Text>
         </Flex> 
    </Card>
  );
};

export default AxieCard;