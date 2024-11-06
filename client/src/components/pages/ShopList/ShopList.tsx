import axios from "axios";
import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import PlantCard from "./PlantCard";
import "./plant.css";
import {
  Select,
  MenuItem,
  Typography,
  Slider,
  Box,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";

const API_URL = import.meta.env.VITE_API_URL;

interface Plant {
  id: number;
  name: string;
  type: string;
  category_id: number;
  price: number;
  size: string;
  light: string;
}

interface Category {
  id: number;
  name: string;
}

export default function ShopList() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [plantType, setPlantType] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [size, setSize] = useState<string>("");
  const [lightRequirement, setLightRequirement] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // const location = useLocation();
  // const query = new URLSearchParams(location.search).get("search");
  // interface ShopListProps {
  //   filterQuery: string;
  // }

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/plants` , { withCredentials: true });
        const plantsData = response.data;

        setPlants(plantsData);

        const highestPrice = Math.max(
                    // @ts-expect-error: Ignore event.
          ...plantsData.map((plant) => plant.price)
        );
        setMaxPrice(highestPrice);
        setPriceRange([0, highestPrice]);
      } catch (error) {
        console.error("Ошибка при загрузке растений:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/categories` , { withCredentials: true });
        const uniqueCategories = Array.from(
                    // @ts-expect-error: Ignore event.
          new Set(response.data.map((category) => category.name))
        ).map((name) =>
          // @ts-expect-error: Ignore event.
          response.data.find((category) => category.name === name)
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Ошибка при загрузке категорий:", error);
      }
    };
    fetchPlants();
    fetchCategories();
  }, []);

  const filteredPlants = plants.filter((plant) => {
    const matchesSearch =
      plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = plantType ? plant.type === plantType : true;
    const matchesCategory = categoryId
      ? plant.category_id === Number(categoryId)
      : true;
    const matchesPrice =
      plant.price >= priceRange[0] && plant.price <= priceRange[1];
    const matchesSize = size ? plant.size === size : true;
    const matchesLight = lightRequirement
      ? plant.light === lightRequirement
      : true;

    return (
      matchesSearch &&
      matchesType &&
      matchesCategory &&
      matchesPrice &&
      matchesSize &&
      matchesLight
    );
  });

  const uniqueCategories = [...new Set(plants.map((plant) => plant.type))];

  return (
    <div
      className="shopListContainer"
      style={{ position: "relative", minHeight: "calc(100vh - 10vh - 5.3vh)" }}
    >
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              width: "300px",
              padding: "20px",
              borderRight: "2px solid black",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Фильтры
            </Typography>

            <TextField
              label="Поиск"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ marginBottom: "20px" }}
            />

            <FormControl sx={{ width: "100%", marginBottom: "20px" }} className="filter-select">
              <InputLabel id="category-select-label">Категория</InputLabel>
              <Select
                labelId="category-select-label"
                value={categoryId}

                label="Категория"
                onChange={(e) => {
                  setCategoryId(e.target.value);
                  setPlantType("");
                }}
              >
                <MenuItem value="">Все категории</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              fullWidth
              sx={{ marginBottom: "20px" }}
              className="filter-select"
            >
              <InputLabel id="type-select-label">Тип растения</InputLabel>
              <Select
                labelId="type-select-label"
                value={plantType}
                label="Тип растения"
                onChange={(e) => setPlantType(e.target.value)}
              >
                <MenuItem value="">Все типы</MenuItem>
                {uniqueCategories
                  .filter((type) =>
                    plants.some(
                      (plant) =>
                        plant.category_id === Number(categoryId) &&
                        plant.type === type
                    )
                  )
                  .map((type, index) => (
                    <MenuItem key={index} value={type}>
                      {type}
                    </MenuItem>
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
              sx={{ width: "100%", marginBottom: "20px"}}
            />

            <FormControl
              className="filter-select"
              sx={{ width: "100%", marginBottom: "20px" }}
            >
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

            <FormControl className="filter-select" sx={{ width: "100%" }}>
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
        </Box>

        <Box className="plant-list">
          {filteredPlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </Box>
      </Box>
    </div>
  );
}
