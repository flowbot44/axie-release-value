import { useState, useEffect, Key, useCallback } from 'react';
import { fetchMarketAxiesData } from  "../axieMarketplace"
import { Axie, MarketAxieData } from '@/interfaces';
import AxieCard from '../components/AxieCard';
import { Grid } from '@aws-amplify/ui-react';

const SkyMavisPage: React.FC = () => {
  const [marketAxieData, setMarketAxieData] = useState<MarketAxieData>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [nextToken, setNextToken] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchData = useCallback(async (pageToken: number) => {


    try {
      const limit = 12; // Number of items per page
      //console.log(pageToken)
      const data = await fetchMarketAxiesData(pageToken, limit);

      setMarketAxieData(data.data);
      setTotalPages(+(data.data!.marketAxies.total/limit).toFixed(0))
      setNextToken(currentPage+1)
    } catch (error) {
      console.error("Failed to fetch data", error);
    } 
  }, [currentPage])

  // Trigger fetching more data when scrolling to the bottom
  useEffect(() => {
    fetchData(currentPage);
  }, []);

   // Handle page navigation
   const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Fetch data based on nextToken or implement custom page handling
    fetchData(newPage);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Axie Market</h1>
      {marketAxieData ? (
      <Grid
      templateColumns={{ base: "1fr", medium: "repeat(2, 1fr)", large: "repeat(4, 1fr)" }}
      gap="1rem"
    >
        {marketAxieData!.marketAxies.results.map((axie: Axie) => (
          <AxieCard key={axie.id} axie={axie} ethUsd={marketAxieData!.exchangeRate.eth.usd} materials={marketAxieData!.erc1155Tokens.results}/>
        ))}
      

      <div className="flex justify-center items-center gap-4 mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Previous
      </button>

      <span>
        Page {currentPage} {totalPages && `of ${totalPages}`}
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!nextToken}
        className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
    </Grid>


      ) : (
        <p>Loading data...</p>
      )}
    
    </div>
    );
  };

export default SkyMavisPage;
