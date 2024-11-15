import React from 'react';
import { Card, Divider, Flex, Link, Text} from '@aws-amplify/ui-react';

import { Axie, ERC1155Token } from '../interfaces';
import { calculateMaterialValue, queryMaterials } from '../calculateMaterials'
import {ethDecimalFormat, ethToUsd} from '../calculateMaterials'

interface AxieCardProps {
  axie: Axie;
  ethUsd: number;
  materials: ERC1155Token[];
}

const AxieCard: React.FC<AxieCardProps> = ({ axie, ethUsd, materials }) => {
    const totalMats = queryMaterials(axie.axpInfo.level,axie.breedCount)
    const totalEthCost = calculateMaterialValue(axie,materials)
    var profit  = "sold"
    var price  = "sold"
    var borderStyle = "1 px solid var(--amplify-colors-primary)"
    var axieUrl = `https://app.axieinfinity.com/marketplace/axies/${axie.id}/`
    if(axie.order){
     profit = ethToUsd(totalEthCost - ethDecimalFormat(axie.order.currentPrice),ethUsd).toFixed(2)
     price = ethToUsd(ethDecimalFormat(axie.order.currentPrice),ethUsd).toFixed(2)
     borderStyle = +profit < 0 ? "1 px solid var(--amplify-colors-primary)" : "5px solid green"
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
                Mats: {totalMats}  Profit: ${profit}
            </Text>
            <Text fontSize="small" color="var(--amplify-colors-font-tertiary)">
               Price: {price}
            </Text>
         </Flex> 
    </Card>
  );
};

export default AxieCard;