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

  const [breedCount, setBreedCount] = useState<number>(3);
  const [level, setLevel] = useState<number>(10);

  const fetchData = useCallback(async (pageToken: number) => {


    try {
      const limit = 12; // Number of items per page

      //console.log(pageToken)
      const data = await fetchMarketAxiesData(pageToken, limit, breedCount, level);
      setCurrentPage(pageToken)
      setMarketAxieData(data.data);
      setTotalPages(+(data.data!.marketAxies.total/limit).toFixed(0))
      setNextToken(currentPage+1)
    } catch (error) {
      console.error("Failed to fetch data", error);
    } 
  }, [breedCount, currentPage, level])

  // Trigger fetching more data when scrolling to the bottom
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, fetchData]);

   // Handle page navigation
   const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Fetch data based on nextToken or implement custom page handling
    fetchData(newPage);
  };

  // Handle page navigation
  const handleBreedCountChange = (newBreedCount: number) => {
    setBreedCount(newBreedCount);

    // Fetch data based on nextToken or implement custom page handling
    fetchData(1);
  };

  // Handle page navigation
  const handleLevelChange = (newLevel: number) => {
    setLevel(newLevel);

    // Fetch data based on nextToken or implement custom page handling
    fetchData(1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Axie Market</h1>

      <div>
      <label>
        Min Breed Count:
        <select value={breedCount} onChange={(e) => handleBreedCountChange(Number(e.target.value))}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
      </label>
      <label>
        Min Level:
        <select value={level} onChange={(e) => handleLevelChange(Number(e.target.value))}>
          <option value="1">1</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="29">29</option>
          <option value="30">30</option>
          <option value="39">39</option>
          <option value="40">40</option>
        </select>
      </label>

    </div>

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
