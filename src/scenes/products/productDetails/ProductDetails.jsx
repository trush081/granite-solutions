import { Box, Button, IconButton, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Product from "../../../components/Product";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../../theme";
import { addToCart } from "../../../state";
import { useDispatch } from "react-redux";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getProduct() {
    const product = await fetch(
      `${process.env.REACT_APP_STRAPI_URL}/api/products/${productId}?populate=image`,
      {
        method: "GET",
      }
    );
    const productJson = await product.json();
    setProduct(productJson.data);
  }

  async function getProducts() {
    const products = await fetch(
      `${process.env.REACT_APP_STRAPI_URL}/api/products?populate=image`,
      {
        method: "GET",
      }
    );
    const productsJson = await products.json();
    setProducts(productsJson.data);
  }

  useEffect(() => {
    getProduct();
    getProducts();
  }, [productId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px">
          <img
            alt={product?.name}
            width="100%"
            height="100%"
            src={`${product?.attributes?.image?.data[0]?.attributes?.url}`}
            style={{ objectFit: "contain" }}
          />
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">

          <Box m="65px 0 25px 0">
            <Typography variant="h3">{product?.attributes?.name}</Typography>
            <Typography>${product?.attributes?.price}</Typography>
            <Typography sx={{ mt: "20px" }}>
              {product?.attributes?.longDescription[0]?.children[0]?.text}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
              }}
              onClick={() => dispatch(addToCart({ product: { ...product, count } }))}
            >
              ADD TO CART
            </Button>
          </Box>

          <Box
            marginTop="10px"
          >
            <Typography>CATEGORIES: {product?.attributes?.category}</Typography>
          </Box>
        </Box>
      </Box>
      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && (
          <div>{product?.attributes?.longDescription[0]?.children[0]?.text}</div>
        )}
        {value === "reviews" && <div>no reviews at current time</div>}
      </Box>
      {/* RELATED PRODUCTS */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Similar Materials
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {products.slice(0, 4).map((product, i) => (
            <Product key={`${product.name}-${i}`} product={product} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetails;