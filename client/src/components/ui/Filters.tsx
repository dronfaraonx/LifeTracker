// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { Select, MenuItem, Typography, Slider, Box, InputLabel, FormControl } from '@mui/material';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Filters({plants, setPlants, uniqueTypes}) {
//   // const [plants, setPlants] = useState([]);
//   const [plantType, setPlantType] = useState('');
//   const [priceRange, setPriceRange] = useState([0, 1000]);
//   const [maxPrice, setMaxPrice] = useState(1000);
//   const [size, setSize] = useState('');
//   const [lightRequirement, setLightRequirement] = useState('');

//   useEffect(() => {
//     const fetchPlants = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/api/plants`);
//         const plantsData = response.data;
//         setPlants(plantsData);

//         const highestPrice = Math.max(...plantsData.map(plant => plant.price));
//         setMaxPrice(highestPrice);
//         setPriceRange([0, highestPrice]);
//       } catch (error) {
//         console.error('Ошибка при загрузке растений:', error);
//       }
//     };
//     fetchPlants();
//   }, []);

//   const filteredPlants = plants.filter(plant => {
//     const matchesType = plantType ? plant.type === plantType : true;
//     const matchesPrice = plant.price >= priceRange[0] && plant.price <= priceRange[1];
//     const matchesSize = size ? plant.size === size : true;
//     const matchesLight = lightRequirement ? plant.light === lightRequirement : true;

//     return matchesType && matchesPrice && matchesSize && matchesLight;
//   });

//   // const uniqueCategories = [...new Set(plants.map(plant => plant.type))];

//   return (
//     <Box sx={{ display: "flex" }}>
//       <Box sx={{ width: '300px', padding: '20px', borderRight: '2px solid black' }}>
//         <Typography variant="h6" gutterBottom>Фильтры</Typography>

//         <FormControl fullWidth sx={{ marginBottom: '20px' }}>
//           <InputLabel id="type-select-label">Тип растения</InputLabel>
//           <Select
//             labelId="type-select-label"
//             value={plantType}
//             label="Тип растения"
//             onChange={(e) => setPlantType(e.target.value)}
//           >
//             <MenuItem value="">Все типы</MenuItem>
//             {uniqueTypes.map((type, index) => (
//               <MenuItem key={index} value={type}>{type}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <Typography gutterBottom>Ценовой диапазон</Typography>
//         <Slider
//           value={priceRange}
//           onChange={(e, newValue) => setPriceRange(newValue)}
//           valueLabelDisplay="auto"
//           min={0}
//           max={maxPrice}
//           sx={{ width: '100%' }}
//         />

//         <FormControl fullWidth sx={{ marginBottom: '20px' }}>
//           <InputLabel id="size-select-label">Размер</InputLabel>
//           <Select
//             labelId="size-select-label"
//             value={size}
//             label="Размер"
//             onChange={(e) => setSize(e.target.value)}
//           >
//             <MenuItem value="">Все размеры</MenuItem>
//             <MenuItem value="small">Маленький</MenuItem>
//             <MenuItem value="medium">Средний</MenuItem>
//             <MenuItem value="large">Большой</MenuItem>
//           </Select>
//         </FormControl>

//         <FormControl fullWidth>
//           <InputLabel id="light-select-label">Освещение</InputLabel>
//           <Select
//             labelId="light-select-label"
//             value={lightRequirement}
//             label="Освещение"
//             onChange={(e) => setLightRequirement(e.target.value)}
//           >
//             <MenuItem value="">Все условия освещения</MenuItem>
//             <MenuItem value="low">Низкий</MenuItem>
//             <MenuItem value="medium">Средний</MenuItem>
//             <MenuItem value="high">Высокий</MenuItem>
//           </Select>
//         </FormControl>
//       </Box>
//     </Box>
//   );
// }
