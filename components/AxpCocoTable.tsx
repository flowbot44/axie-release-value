import { calcAxpCocoItems } from '@/calculateMaterials';
import { AxpCocoItem, ERC1155Token } from '@/interfaces';
import React from 'react';


interface AxpCocoProps {
    ethUsd: number|null;
    materials: ERC1155Token[]|null;
  }

const AxpCocoTable: React.FC<AxpCocoProps> = ({ materials, ethUsd }) => {
    const items: AxpCocoItem[] = calcAxpCocoItems(materials, ethUsd)

    

    
  return (
    <div className="overflow-x-auto">
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Consumable</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>AXP</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>$ per 50 AXP</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((consumable, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{consumable.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{consumable.axp}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>${consumable.marketPrice.toFixed(2)}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>${consumable.pricePerAxp.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AxpCocoTable;