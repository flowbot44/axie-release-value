import axios from 'axios';
async function fetchData(query: object): Promise<any> {
    const axieApiUrl = process.env.NEXT_PUBLIC_AXIE_API_URL;
    if (!axieApiUrl) {
        throw new Error('API URL is not defined. Please set NEXT_PUBLIC_AXIE_API_URL in your environment variables.');
    }

    const apiKey = process.env.NEXT_PUBLIC_AXIE_API_KEY;
    if (!apiKey) {
        throw new Error('API key is not defined. Please set NEXT_PUBLIC_AXIE_API_KEY in your environment variables.');
    }

    const response = await axios.post(axieApiUrl, query, {
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': apiKey,
        }
    });

    const data = response.data;
    console.log(data);
    return data;
}

export async function fetchAxieMaterialData(axieId: number) {
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

    return await fetchData(query);
}

export async function fetchGachaItemData() {
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

    return await fetchData(query);
}

export async function fetchCraftingItemData() {
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

    return await fetchData(query);
}

export async function fetchMarketAxiesData(page: number, limit: number) {
    const query = {
        query: `{
                erc1155Tokens(tokenType: Material) {
                    results {
                    attributes
                    minPrice
                    }
                }
                marketAxies: axies(
                    criteria: {level: [10, 60], breedCount: [3, 7]}
                    auctionType: Sale
                    from: ${(page * limit) - limit}
                    size: ${limit}
                    sort: PriceAsc
                ) {
                    results {
                        id
                        breedCount
                        axpInfo {
                            level
                            shouldAscend
                        }
                        class
                        order {
                            currentPrice
                        }
                        parts {
                            class
                        }

                    }
                    total
                }
                exchangeRate {
                    eth {
                    usd
                    }
                }
    }
        `,
    };

    return await fetchData(query);
}