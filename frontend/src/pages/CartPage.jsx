import { useEffect } from "react";
import { useCartStore } from "../store/cart";
import { Box, Heading, VStack, Text, Button } from "@chakra-ui/react";

const CartPage = () => {
  const { cart, fetchCart, removeFromCart } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <Box maxW="container.md" mx="auto" mt={10}>
      <Heading mb={6}>Your Cart</Heading>
      <VStack spacing={4} align="stretch">
        {cart.length === 0 ? (
          <Text>No items in cart.</Text>
        ) : (
          cart.map((item) => (
            <Box key={item.product._id} p={4} shadow="md" borderWidth="1px" rounded="md">
              <Text fontWeight="bold">{item.product.name}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text>Price: ${item.product.price}</Text>
              <Button colorScheme="red" size="sm" onClick={() => removeFromCart(item.product._id)}>
                Remove
              </Button>
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
};

export default CartPage;
