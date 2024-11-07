import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PlantCard from "./PlantCard";
import { Box, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

interface Plant {
  id: number;
  name: string;
  type: string;
  description?: string;
  price?: number;
}

const API_URL = import.meta.env.VITE_API_URL;

export default function ShopList() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
  const [, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/plants`);
        setPlants(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading plants:", error);
        setIsLoading(false);
      }
    };
    fetchPlants();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(location.search);
      const searchQuery = params.get("search") || "";
      setSearchQuery(searchQuery);
      
      const filtered = plants.filter((plant) =>
        plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.type.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredPlants(filtered);
    }, 500);

    return () => clearTimeout(timeoutId); 
  }, [location.search, plants]);

  if (isLoading) {
    return <p>Загрузка растений...</p>;
  }

  return (
<Box sx={{ 
  display: "flex", 
  flexDirection: "row", 
  flexWrap: "wrap",      
  minHeight: "calc(100vh - 10vh - 5.3vh)", 
  backgroundColor: '#f3fff3',
  fontSize: "1.2rem",
  "& .MuiTableCell-root": {
    fontSize: "1.4rem", 
  }
}}>  
  <div style={{ margin: "20px"}}>
    <h2>Результаты поиска:</h2>
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {filteredPlants.length > 0 ? (
        filteredPlants.map((plant) => (
          <PlantCard key={plant.id} plant={plant}  />
        ))
      ) : (
        <p>Не найдено</p>
      )}
    </div>
     <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mt: 2, ml: 3}}>
          Назад
        </Button>
  </div>
</Box>

  );
}
