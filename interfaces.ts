export interface Axie {
    id: number;
    breedCount: number;
    axpInfo: {
      level: number;
      shouldAscend:boolean;
    };
    class: string;
    order: {
      currentPrice: number
    };
    parts: {
      class: string;
    }[];
  }
  
export interface ERC1155Token {
    attributes: {
      class: string;
    };
    name: string;
    minPrice: number;
  }
  
export interface Data {
    axie: Axie;
    erc1155Tokens: {
      results: ERC1155Token[];
    };
  }

  export interface GachaData {
    consumableTokens: {
      results: ERC1155Token[];
    };
    materialTokens: {
      results: ERC1155Token[];
    };
    mysticAxie: {
      results: Axie[];
    };
    exchangeRate: ExchangeRate;
  }

  export interface CraftingData {
    consumableTokens: {
      results: ERC1155Token[];
    };
    materialTokens: {
      results: ERC1155Token[];
    };
    exchangeRate: ExchangeRate;
  }

  export interface CraftingItem {
    name: string;
    costToMake: number;
    marketPrice: number;
    profit: number;
  };

  export interface AxpCocoItem {
    name: string;
    axp: number;
    marketPrice: number;
    pricePerAxp: number;
  };

  export interface ExchangeRate {

      eth: {
        usd: number;
      };

  }

  export interface MarketAxieData{
    
    erc1155Tokens: {
      results: ERC1155Token[];
    };
    marketAxies: {
      results: Axie[];
      total: number;
    }
    exchangeRate: ExchangeRate;

  }