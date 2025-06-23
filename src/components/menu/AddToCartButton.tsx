/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/formatters";
import { Extra, ProductSize, Size } from "@prisma/client";
import { ProductWithRelations } from "@/Types/products";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addCartItem, removeCartItem, removeItemFromCart, selectCartItems } from "@/redux/features/cart/cartSlice";
import { getItemQuantity } from "@/lib/cart";

function AddToCartButton({ product }: { product: ProductWithRelations }) {
  const cart = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  const quantity = getItemQuantity(cart, product.id) || 0;

  const defaultSize =
    cart.find((element) => element.id === product.id)?.size ||
    product.sizes.find((size) => size.name === ProductSize.SMALL);

  const defaultExtras =
    cart.find((element) => element.id === product.id)?.extras || [];

  const [selectedSize, setSelectedSize] = useState<Size>(defaultSize!);
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>(defaultExtras);

  let totalPrice = product.basePrice;
  if (selectedSize) {
    totalPrice += selectedSize.Price;
  }
  if (selectedExtras.length > 0) {
    // totalPrice += selectedExtras.reduce((acc, extra) => acc + extra.Price, 0);
    for(const extra of selectedExtras) {
      totalPrice += extra.Price;
    }
  }

  const handleAddToCart = () => {
    // const cartItem = {
    //   id: product.id,
    //   name: product.name,
    //   basePrice: product.baseprice,
    //   image: product.image,
    //   size: selectedSize,
    //   extras: selectedExtras,
    // };
    // dispatch({ type: "cart/addCartItem", payload: cartItem });
  dispatch(addCartItem({
    id: product.id,
    name: product.name,
    basePrice: product.basePrice,
    image: product.image,
    size: selectedSize,
    extras: selectedExtras,
  }));
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          size={"lg"}
          className="mt-4 text-white !rounded-full !px-8"
        >
          Add to Cart
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex items-center ">
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
          />
          <DialogTitle className="text-center">{product.name}</DialogTitle>
          <DialogDescription>{product.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-10">
          <div className="space-y-4 text-center">
            <Label htmlFor="size">Pick your size</Label>
            <PickSize
              sizes={product.sizes}
              product={product}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />
          </div>
          <div className="space-y-4 text-center">
            <Label htmlFor="extra">Any extras?</Label>
            <Extras
              extras={product.extras}
              selectedExtras={selectedExtras}
              setSelectedExtras={setSelectedExtras}
            />
          </div>
        </div>
        <DialogFooter>
          {quantity === 0 ? (
            <Button
              type="submit"
              onClick={handleAddToCart}
              className="w-full h-10"
            >
              Add to cart {formatCurrency(totalPrice)}
            </Button>
          ) : (
            <ChooseQuantity
              quantity={quantity}
              product={product}
              selectedSize={selectedSize}
              selectedExtras={selectedExtras}
            />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddToCartButton;

function PickSize({
  sizes,
  product,
  selectedSize,
  setSelectedSize,
}: {
  sizes: Size[];
  product: ProductWithRelations;
  selectedSize: Size;
  setSelectedSize: React.Dispatch<React.SetStateAction<Size>>;
}) {
  return (
    <RadioGroup defaultValue="comfortable">
      {sizes.map((size: any) => (
        <div
          key={size.id}
          className="flex items-center space-x-2 border border-gray-100 rounded-md p-4"
        >
          <RadioGroupItem
            value={selectedSize.name}
            checked={selectedSize.id === size.id}
            // we used onClick instead of onChange because shadcn/ui consider Radio is button not input
            onClick={() => setSelectedSize(size)}
            id={size.id}
          />
          <Label htmlFor={size.id}>
            {size.name} {formatCurrency(product.basePrice + size.Price)}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

function Extras({
  extras,
  selectedExtras,
  setSelectedExtras,
}: {
  extras: Extra[];
  selectedExtras: Extra[];
  setSelectedExtras: React.Dispatch<React.SetStateAction<Extra[]>>;
}) {
  const handleExtras = (extra: Extra) => {
    if (selectedExtras.find((ex) => ex.id === extra.id)) {
      setSelectedExtras(selectedExtras.filter((ex) => ex.id !== extra.id));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };
  return (
    <>
      {extras.map((extra) => (
        <div
          key={extra.id}
          className="flex items-center space-x-2 border border-gray-100 rounded-md p-4"
        >
          <Checkbox
            id={extra.id}
            onClick={() => handleExtras(extra)}
            checked={Boolean(selectedExtras.find((ex) => ex.id === extra.id))}
          />
          <Label
            htmlFor={extra.id}
            className="text-sm text-accent font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {extra.name} {formatCurrency(extra.Price)}
          </Label>
        </div>
      ))}
    </>
  );
}

const ChooseQuantity = ({
  quantity,
  product,
  selectedExtras,
  selectedSize,
}: {
  quantity: number;
  selectedExtras: Extra[];
  selectedSize: Size;
  product: ProductWithRelations;
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center flex-col gap-2 mt-4 w-full">
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          onClick={() => dispatch(removeCartItem({ id: product.id }))}
        >
          -
        </Button>
        <div>
          <span className="text-black">{quantity} in cart</span>
        </div>
        <Button
          variant="outline"
          onClick={() =>
            dispatch(
              addCartItem({
                basePrice: product.basePrice,
                id: product.id,
                image: product.image,
                name: product.name,
                extras: selectedExtras,
                size: selectedSize,
              })
            )
          }
        >
          +
        </Button>
      </div>
      <Button
        size="sm"
        onClick={() => dispatch(removeItemFromCart({ id: product.id }))}
      >
        Remove
      </Button>
    </div>
  );
};