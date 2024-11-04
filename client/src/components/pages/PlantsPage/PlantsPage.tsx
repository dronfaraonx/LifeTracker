import axios from 'axios';
import { useEffect, useState } from 'react';
// import CloneCard from '../CloneCard/CloneCard';
import '../ShopList/plant.css';
import { Select, MenuItem, Typography, Box, InputLabel, FormControl, Slider } from '@mui/material';
import Plant from '../ShopList/Plant';
import PlantCard from '../ShopList/PlantCard';

const API_URL = import.meta.env.VITE_API_URL;

export default function PlantPage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [plantType, setPlantType] = useState<string>('');
      const [priceRange, setPriceRange] = useState<number[]>([0, 500]); 
  const [maxPrice, setMaxPrice] = useState<number>(500); 
  const [size, setSize] = useState<string>('');
  const [lightRequirement, setLightRequirement] = useState<string>('');

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/allplants`);
        const PlantsData = response.data
        setPlants(PlantsData);
              const highestPrice = Math.max(...PlantsData.map(plant => plant.price));
      setMaxPrice(highestPrice);
      setPriceRange([0, highestPrice]);      } catch (error) {
        console.error('Ошибка при загрузке растений:', error);
      }
    };

    fetchPlants();
  }, []);
const filteredPlants = plants.filter(plant => {
    const matchesType = plantType ? plant.type === plantType : true;
    const matchesPrice = plant.price >= priceRange[0] && plant.price <= priceRange[1];
    const matchesSize = size ? plant.size === size : true;
    const matchesLight = lightRequirement ? plant.light === lightRequirement : true;

    return matchesType && matchesPrice && matchesSize && matchesLight;
  });

  const uniqueTypes = [...new Set(plants.map((plant) => plant.type))];


  return (
    <Box sx={{ display:"flex", minHeight: "calc(100vh - 10vh - 5.3vh)"}}>
     <Box sx={{ display: "flex" }}>
  <Box sx={{ width: '250px', padding: '20px', borderRight: '2px solid black' }}>
        <Typography variant="h6" gutterBottom>Фильтры</Typography>

        <FormControl fullWidth sx={{ marginBottom: '20px', width: '200px' }}>
          <InputLabel id="type-select-label">Тип растений</InputLabel>
          <Select
            labelId="type-select-label"
            value={plantType}
            label="Тип семян"
            onChange={(e) => setPlantType(e.target.value)}
          >
            <MenuItem value="">Все типы</MenuItem>
            {uniqueTypes.map((type, index) => (
              <MenuItem key={index} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>
      <Typography gutterBottom>Ценовой диапазон</Typography>
        <Slider
          value={priceRange}
          onChange={(e, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={maxPrice}
          className="price-slider"
          sx={{ width: '100%' }}
        />

    <FormControl className="filter-select" sx={{ width: '100%', marginBottom: '20px' }}>
      <InputLabel id="size-select-label">Размер</InputLabel>
      <Select
        labelId="size-select-label"
        value={size}
        label="Размер"
        onChange={(e) => setSize(e.target.value)}
      >
        <MenuItem value="">Все размеры</MenuItem>
        <MenuItem value="small">Маленький</MenuItem>
        <MenuItem value="medium">Средний</MenuItem>
        <MenuItem value="large">Большой</MenuItem>
      </Select>
    </FormControl>

    <FormControl className="filter-select" sx={{ width: '100%' }}>
      <InputLabel id="light-select-label">Освещение</InputLabel>
      <Select
        labelId="light-select-label"
        value={lightRequirement}
        label="Освещение"
        onChange={(e) => setLightRequirement(e.target.value)}
      >
        <MenuItem value="">Все условия освещения</MenuItem>
        <MenuItem value="low">Низкий</MenuItem>
        <MenuItem value="medium">Средний</MenuItem>
        <MenuItem value="high">Высокий</MenuItem>
      </Select>
    </FormControl>
        </Box>


      <Box className="plant-list" sx={{ padding: '20px' }}>
        {filteredPlants.map((plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </Box>
    </Box>
    </Box>
  );
}
