// pages/gacha.tsx

import React, { useEffect, useState } from 'react';
import { fetchGachaItemData } from  "../axieMarketplace"
import { calculateBasicRollValue, calculatePremiumRollValue } from '../calculateMaterials'
import Image from 'next/image';


const Gacha: React.FC = () => {

  const [basicRollValue, setBasicRollValue] = useState<number>(0);
  const [premiumRollValue, setPremiumRollValue] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRollValues = async () => {
      try {
        const data = await fetchGachaItemData(); // Add your endpoint here

        setBasicRollValue(calculateBasicRollValue(data.data));
        setPremiumRollValue(calculatePremiumRollValue(data.data));
      } catch (error) {
        console.error('Error fetching gacha values:', error);
        setError('Failed to fetch gacha values. Please try again later.');
      }
    };

    fetchRollValues();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Choose {premiumRollValue >= basicRollValue ? 'Premium' : 'Lucky'} Pouch </h1>  
      <Image 
              src={premiumRollValue >= basicRollValue ? 'https://cdn.axieinfinity.com/marketplace-website/asset-icon/pounch-2.png' : 'https://cdn.axieinfinity.com/marketplace-website/asset-icon/pounch-1.png'}
              width={84} height={79} alt={'Gacha Pouch to roll'}/>
      <h2>Expected Value</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
        
          <p><strong>Basic Roll per 10 slips:</strong> {basicRollValue !== null ? `$${basicRollValue.toFixed(3)}` : 'Loading...'}</p>
          <p><strong>Premium Roll per 10 slips:</strong> {premiumRollValue !== null ? `$${premiumRollValue.toFixed(3)}` : 'Loading...'}</p>
        </>
      )}
    </div>
  );
};

export default Gacha;