


export async function fetchAxieMaterialData(axieId:number) {

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
                }
            }
            }
        `,
    };

    const response = await fetch('https://api-gateway.skymavis.com/graphql/axie-marketplace', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': 'pIt8ImWnh8DBXAQKoJ4KamzIvLkeHiT7', // Add your access token if needed
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