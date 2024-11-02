// Filters.tsx
import { Select, MenuItem, Typography, Slider, Box, InputLabel, FormControl } from '@mui/material';
import { useEffect } from 'react';

const Filters = ({
  categories,
  setCategoryId,
  categoryId,
  plantType,
  setPlantType,
  maxPrice,
  priceRange,
  setPriceRange,
  size,
  setSize,
  lightRequirement,
  setLightRequirement,
  plants,
}) => {

   useEffect(() => {
  const fetchPlants = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/plants`);
      const plantsData = response.data;

      setPlants(plantsData);

      const highestPrice = Math.max(...plantsData.map(plant => plant.price));
      setMaxPrice(highestPrice);
      setPriceRange([0, highestPrice]);
    } catch (error) {
      console.error('Ошибка при загрузке растений:', error);
    }
  };

  fetchPlants();
}, []);

  return (
      <>

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
    </>
  );
};

export default Filters;
