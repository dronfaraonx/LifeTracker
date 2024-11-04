import axios from 'axios';
import { useEffect, useState } from 'react';
// import CloneCard from '../CloneCard/CloneCard';
import './../ShopList/plant.css';
import { Select, MenuItem, Typography, Box, InputLabel, FormControl, Slider } from '@mui/material';
import PlantCard from '../ShopList/PlantCard';

const API_URL = import.meta.env.VITE_API_URL;

export default function SeedPage() {
  const [plants, setPlants] = useState([]);
  const [plantType, setPlantType] = useState('');
    const [priceRange, setPriceRange] = useState([0, 500]); 
  const [maxPrice, setMaxPrice] = useState(500); 
  const [size, setSize] = useState('');
  const [lightRequirement, setLightRequirement] = useState('');

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/allseeds`);
        const seedsData = response.data
        setPlants(seedsData);
        // @ts-expect-error: Ignore this event.
              const highestPrice = Math.max(...seedsData.map(plant => plant.price));
      setMaxPrice(highestPrice);
      setPriceRange([0, highestPrice]);
      } catch (error) {
        console.error('Ошибка при загрузке растений:', error);
      }
    };

    fetchPlants();
  }, []);

    const filteredPlants = plants.filter(plant => {
      // @ts-expect-error: Ignore this event.
    const matchesType = plantType ? plant.type === plantType : true;
    // @ts-expect-error: Ignore this event.
    const matchesPrice = plant.price >= priceRange[0] && plant.price <= priceRange[1];
    // @ts-expect-error: Ignore this event.
    const matchesSize = size ? plant.size === size : true;
    // @ts-expect-error: Ignore this event.
    const matchesLight = lightRequirement ? plant.light === lightRequirement : true;

    return matchesType && matchesPrice && matchesSize && matchesLight;
  });
// @ts-expect-error: Ignore this event.
  const uniqueTypes = [...new Set(plants.map((plant) => plant.type))];

  return (
 <Box sx={{ display:"flex", minHeight: "calc(100vh - 10vh - 5.3vh)"}}>
     <Box sx={{ display: "flex" }}>
  <Box sx={{ width: '250px', padding: '20px', borderRight: '2px solid black' }}>
        <Typography variant="h6" gutterBottom>Фильтры</Typography>

        <FormControl fullWidth sx={{ marginBottom: '20px', width: '200px' }}>
          <InputLabel id="type-select-label">Тип семян</InputLabel>
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
          // @ts-expect-error: Ignore this event.
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

      <Box className="plant-list">
        {filteredPlants.map((plant) => (
          // @ts-expect-error: Ignore this event.
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </Box>
    </Box>
    </Box>
  );
}
