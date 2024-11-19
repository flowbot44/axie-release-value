// pages/crafting.tsx

import React, { useCallback, useEffect, useState } from 'react';
import { fetchCraftingItemData } from  "../axieMarketplace"
import { CraftingItem } from "../interfaces"
import { calculateCraftingInfo} from '../calculateMaterials'

const Crafting: React.FC = () => {

    const [error, setError] = useState<string | null>(null);
    const [craftingItems, setCraftingItems] = useState<CraftingItem[]>([]);

    const fetchCraftingValues = useCallback(async () => {
      try {
        const data = await fetchCraftingItemData(); // Add your endpoint here
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
        </>
      )}
      </div>
  );
};

export default Crafting;