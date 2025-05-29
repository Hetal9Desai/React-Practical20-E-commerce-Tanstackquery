import React from "react";
import { Box, Typography } from "@mui/material";

export const Footer: React.FC = () => (
  <Box
    component="footer"
    sx={{
      bgcolor: "grey.200",
      p: 2,
      textAlign: "center",
    }}
  >
    <Typography variant="body2">© 2025 MyApp. All rights reserved.</Typography>
  </Box>
);
