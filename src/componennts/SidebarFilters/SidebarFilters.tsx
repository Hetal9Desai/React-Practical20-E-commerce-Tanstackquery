import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Slider,
  Button,
  Divider,
} from "@mui/material";

export interface FilterOpts {
  sortBy: "name" | "price";
  sortDir: "asc" | "desc";
  category: string;
  priceMin: number;
  priceMax: number;
  ratingMin: number;
  discountMin: number;
}

interface SidebarFiltersProps {
  categories: string[];
  onFilter: (opts: FilterOpts) => void;
}

export const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  categories,
  onFilter,
}) => {
  const [sortBy, setSortBy] = useState<"name" | "price">("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [category, setCategory] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(10000);
  const [ratingMin, setRatingMin] = useState(0);
  const [discountMin, setDiscountMin] = useState(0);

  const handleApply = () => {
    onFilter({
      sortBy,
      sortDir,
      category,
      priceMin,
      priceMax,
      ratingMin,
      discountMin,
    });
  };

  return (
    <Box sx={{ width: 280, minWidth: 240, px: 2, py: 3 }}>
      <Typography variant="h6" gutterBottom>
        Sort By
      </Typography>

      <FormControl fullWidth margin="dense">
        <InputLabel>Field</InputLabel>
        <Select
          value={sortBy}
          label="Field"
          onChange={(e) => setSortBy(e.target.value as "name" | "price")}
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="price">Price</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="dense">
        <InputLabel>Direction</InputLabel>
        <Select
          value={sortDir}
          label="Direction"
          onChange={(e) => setSortDir(e.target.value as "asc" | "desc")}
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>

      <FormControl fullWidth margin="dense">
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          label="Category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        <TextField
          label="Min Price"
          type="number"
          value={priceMin}
          onChange={(e) => setPriceMin(Number(e.target.value))}
          fullWidth
          size="small"
        />
        <TextField
          label="Max Price"
          type="number"
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          fullWidth
          size="small"
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography gutterBottom>Minimum Rating</Typography>
        <Slider
          value={ratingMin}
          onChange={(_, val) => setRatingMin(val as number)}
          min={0}
          max={5}
          step={0.5}
          valueLabelDisplay="auto"
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography gutterBottom>Minimum Discount (%)</Typography>
        <Slider
          value={discountMin}
          onChange={(_, val) => setDiscountMin(val as number)}
          min={0}
          max={100}
          step={1}
          valueLabelDisplay="auto"
        />
      </Box>

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleApply}
      >
        Apply
      </Button>
    </Box>
  );
};
