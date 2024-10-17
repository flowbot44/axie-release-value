import React, { useEffect, useState } from 'react';
import { fetchAxieMaterialData } from  "../axieMarketplace"
import { calculateMaterialValue, queryMaterials } from '../calculateMaterials'
import {Data} from '../interfaces'



const ReleaseValue:  React.FC = () => {
    const [id, setId] = useState<number>(0);
    const [marketplaceData, setMarketplaceData] = useState<Data | null>(null);
    const [totalMats, setTotalMats] = useState<number>(0);
    const [ethPrice, setEthPrice] = useState<number>(0);

    const handleFetchMarketplaceData = async () => {
        try {
            const data = await fetchAxieMaterialData(id); // Add your endpoint here
            setMarketplaceData(data.data);
            setTotalMats(queryMaterials(data.data.axie.axpInfo.level, data.data.axie.breedCount));
            setEthPrice(calculateMaterialValue(data.data.axie, data.data.erc1155Tokens.results));
        } catch (error) {
            console.error(error);
        }
    };
       

    return (
      <div>
        <h1>Axie Release Value</h1>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(+e.target.value)}
          placeholder="Enter ID"
        />
        <button onClick={handleFetchMarketplaceData}>Lookup Axie</button>
        {marketplaceData ? (
        <div>
          <h2>Axie Data</h2>
          <p>Materials: Min - { totalMats * .70 } Avg - {totalMats} Max - { totalMats * 1.30 } </p>
          <p>Price Of Mats: Min - { ethPrice * .70 } Avg - {ethPrice} Max - { ethPrice * 1.30 } </p>
          <p>Breed Count: {marketplaceData.axie.breedCount} Level: {marketplaceData.axie.axpInfo.level}</p>
          <h3>Parts</h3>
          <p>Body Type: {marketplaceData.axie.class} - { totalMats *.25 }</p>
          <ul>
            {marketplaceData.axie.parts.map((part: any, index: number) => (
              <li key={index}>{part.class} - { totalMats *.125 }</li>
            ))}
          </ul>
          {/* <h2>ERC1155 Tokens</h2>
          <ul>
            {data.erc1155Tokens.results.map((token: any, index: number) => (
              <li key={index}>
                Class: {token.attributes.class}, Min Price: {token.minPrice}
              </li>
            ))}
          </ul> */}
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};
  


export default ReleaseValue;