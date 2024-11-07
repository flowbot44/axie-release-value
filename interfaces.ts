export interface Axie {
    breedCount: number;
    axpInfo: {
      level: number;
    };
    class: string;
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
  }