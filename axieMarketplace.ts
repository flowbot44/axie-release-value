
const axieApiUrl = 'https://api-gateway.skymavis.com/graphql/axie-marketplace';

export async function fetchAxieMaterialData(axieId:number) {
    const apiKey = process.env.NEXT_PUBLIC_AXIE_API_KEY;
    const query = {
        query: `
            {
                axie(axieId: "${axieId}") {
                    breedCount
                    axpInfo {
                    level
                    }
                    class
                    parts {
                    class
                    }
                }
                erc1155Tokens(tokenType: Material) {
                    results {
                    attributes
                    minPrice
                    name
                    }
                }
                    

            }
        `,
    };

    const response = await fetch(axieApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey!, // Add your access token if needed
        },
        body: JSON.stringify(query),
      })
    
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data)
    return data;
}


export async function fetchGachaItemData() {
    const apiKey = process.env.NEXT_PUBLIC_AXIE_API_KEY;
    const query = {
        query: `
            {
                consumableTokens: erc1155Tokens(
                    tokenIds: ["1", "2"]
                    tokenType: Consumable
                ) {
                    results {
                    name
                    minPrice
                    }
                }

                materialTokens: erc1155Tokens(
                    tokenIds: ["1020847100762815390390123824494327889920"]
                    tokenType: Material
                ) {
                    results {
                    name
                    minPrice
                    }
                }
                mysticAxie: axies(criteria: {numMystic: 1}, sort: PriceAsc, size: 1) {
                    results {
                        order {
                            currentPrice
                        }
                    }
                }
                exchangeRate {
                    eth {
                        usd
                    }
                }
            }
        `,
    };

    const response = await fetch(axieApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey!, // Add your access token if needed
        },
        body: JSON.stringify(query),
      })
    
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data)
    return data;
}



export async function fetchCraftingItemData() {
    const apiKey = process.env.NEXT_PUBLIC_AXIE_API_KEY;
    const query = {
        query: `
            {
                consumableTokens: erc1155Tokens(tokenIds: ["1","2","3","4"], tokenType: Consumable) {
                    results {
                    name
                    minPrice
                    }
                }
                materialTokens: erc1155Tokens(
                    tokenIds: ["1112396529664","1116691496960"]
                    tokenType: Material
                ) {
                    results {
                    name
                    minPrice
                    }
                }
                exchangeRate {
                    eth {
                        usd
                    }
                }
            }
        `,
    };

    const response = await fetch(axieApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey!, // Add your access token if needed
        },
        body: JSON.stringify(query),
      })
    
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data)
    return data;
}


