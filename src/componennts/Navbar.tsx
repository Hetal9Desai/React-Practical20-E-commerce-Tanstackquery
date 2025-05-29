import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { setSearchTerm } from "../features/search/searchSlice";
import { logout } from "../features/auth/authSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  width: "auto",
  marginRight: theme.spacing(2),
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  width: "20ch",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create("width"),
  },
}));

export const Navbar: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isProductList = location.pathname === "/products";

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          MyApp
        </Typography>

        {user && <Box sx={{ flexGrow: 1 }} />}

        {user && isProductList && (
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearchChange}
            />
          </Search>
        )}

        {user && (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              color="secondary"
              component={RouterLink}
              to="/add-product"
              sx={{
                textTransform: "none",
                fontWeight: 500,
                boxShadow: "none",
              }}
            >
              + Create Product
            </Button>

            <Button
              variant="outlined"
              color="inherit"
              onClick={handleLogout}
              sx={{ textTransform: "none" }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
