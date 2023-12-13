import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Tab, Tabs, useMediaQuery } from "@mui/material";
import Product from "../../components/Product";
import { setProducts } from "../../state";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const products = useSelector((state) => state.cart.products);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getProducts() {
    const products = await fetch(
      `${process.env.REACT_APP_STRAPI_URL}/api/products?populate=image`,
      { method: "GET" }
    );
    const productsJson = await products.json();
    dispatch(setProducts(productsJson.data));
  }

  useEffect(() => {
    getProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const graniteProducts = products.filter(
    (product) => product.attributes.category === "granite"
  );
  const marbleProducts = products.filter(
    (product) => product.attributes.category === "marble"
  );
  const quartzProducts = products.filter(
    (product) => product.attributes.category === "quartz"
  );

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        <b>Materials</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="All" value="all" />
        <Tab label="Granite" value="granite" />
        <Tab label="Marble" value="marble" />
        <Tab label="Quartz" value="quartz" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" &&
          products.map((product) => (
            <Product product={product} key={`${product.name}-${product.id}`} />
          ))}
        {value === "granite" &&
          graniteProducts.map((product) => (
            <Product product={product} key={`${product.name}-${product.id}`} />
          ))}
        {value === "marble" &&
          marbleProducts.map((product) => (
            <Product product={product} key={`${product.name}-${product.id}`} />
          ))}
        {value === "quartz" &&
          quartzProducts.map((product) => (
            <Product product={product} key={`${product.name}-${product.id}`} />
          ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;