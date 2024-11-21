// pages/crafting.tsx

import React, { useCallback, useEffect, useState } from 'react';
import { fetchCraftingItemData } from  "../axieMarketplace"
import { CraftingData, CraftingItem } from "../interfaces"
import { calculateCraftingInfo} from '../calculateMaterials'
import AxpCocoTable from '@/components/AxpCocoTable';

const Crafting: React.FC = () => {

    const [error, setError] = useState<string | null>(null);
    const [craftingItems, setCraftingItems] = useState<CraftingItem[]>([]);
    const [craftingData, setCraftingData] = useState<CraftingData | null>(null);

    const fetchCraftingValues = useCallback(async () => {
      try {
        const data = await fetchCraftingItemData(); // Add your endpoint here
        setCraftingData(data.data)
      setCraftingItems(calculateCraftingInfo(data.data))
      } catch (error) {
          console.error('Error fetching gacha values:', error);
          setError('Failed to fetch gacha values. Please try again later.');
        }
      }, []);
   
    useEffect(() => {
      fetchCraftingValues();
    }, [fetchCraftingValues]);

return (
    <div style={{ padding: '20px' }}>
      <h1>Crafting  </h1>  
      
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
            <div style={{ padding: '20px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Cost to Make</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Market Price</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Profit</th>
          </tr>
        </thead>
        <tbody>
          {craftingItems.map((item, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>${item.costToMake.toFixed(2)}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>${item.marketPrice.toFixed(2)}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>${item.profit.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <AxpCocoTable materials={craftingData!.consumableTokens.results} ethUsd={craftingData!.exchangeRate.eth.usd}/>
        </>
      )}
      </div>
  );
};

export default Crafting;