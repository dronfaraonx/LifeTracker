import axios from 'axios';
import { useEffect, useState } from 'react';
import CloneCard from '../CloneCard/CloneCard';
import '../ShopList/plant.css';
import { Select, MenuItem, Typography, Box, InputLabel, FormControl } from '@mui/material';

const API_URL = import.meta.env.VITE_API_URL;

export default function ShopList() {
  const [plants, setPlants] = useState([]);
  const [plantType, setPlantType] = useState('');

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/clones`);
        setPlants(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке клонов:', error);
      }
    };

    fetchPlants();
  }, []);

  const filteredPlants = plants.filter((plant) => {
    return plantType ? plant.type === plantType : true;
  });

  const uniqueTypes = [...new Set(plants.map((plant) => plant.type))];

  return (
    <Box display="flex">
      <Box sx={{ width: '250px', padding: '20px', borderRight: '2px solid black' }}>
        <Typography variant="h6" gutterBottom>Фильтры</Typography>

        <FormControl fullWidth sx={{ marginBottom: '20px', width: '200px' }}>
          <InputLabel id="type-select-label">Тип клонов</InputLabel>
          <Select
            labelId="type-select-label"
            value={plantType}
            label="Тип клонов"
            onChange={(e) => setPlantType(e.target.value)}
          >
            <MenuItem value="">Все типы</MenuItem>
            {uniqueTypes.map((type, index) => (
              <MenuItem key={index} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box className="plant-list" sx={{ padding: '20px' }}>
        {filteredPlants.map((plant) => (
          <CloneCard key={plant.id} plant={plant} />
        ))}
      </Box>
    </Box>
  );
}
