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
    minPrice: number;
  }
  
export interface Data {
    axie: Axie;
    erc1155Tokens: {
      results: ERC1155Token[];
    };
  }