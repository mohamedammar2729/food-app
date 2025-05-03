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

const sizes = [
  { id: crypto.randomUUID(), name: "Small", price: 0 },
  { id: crypto.randomUUID(), name: "Medium", price: 4 },
  { id: crypto.randomUUID(), name: "Large", price: 8 },
];

const extras = [
  { id: crypto.randomUUID(), name: "Cheese", price: 2 },
  { id: crypto.randomUUID(), name: "Sauce", price: 1 },
  { id: crypto.randomUUID(), name: "Toppings", price: 3 },
];

function AddToCartButton({ product }: { product: any }) {
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
            alt={product.title}
            width={200}
            height={200}
          />
          <DialogTitle className="text-center">{product.title}</DialogTitle>
          <DialogDescription>{product.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-10">
          <div className="space-y-4 text-center">
            <Label htmlFor="size">Pick your size</Label>
            <PickSize sizes={sizes} product={product} />
          </div>
          <div className="space-y-4 text-center">
            <Label htmlFor="extra">Any extras?</Label>
            <Extras extras={extras} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full h-10">Add To Cart</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddToCartButton;

function PickSize({ sizes, product }: { sizes: any; product: any }) {
  return (
    <RadioGroup defaultValue="comfortable">
      {sizes.map((size: any) => (
        <div
          key={size.id}
          className="flex items-center space-x-2 border border-gray-100 rounded-md p-4"
        >
          <RadioGroupItem value="default" id={size.id} />
          <Label htmlFor={size.id}>
            {size.name} {formatCurrency(product.price + size.price)}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

function Extras({ extras}: { extras: any }) {
  return (
    <>
      {extras.map((extra: any) => (
        <div
          key={extra.id}
          className="flex items-center space-x-2 border border-gray-100 rounded-md p-4"
        >
          <Checkbox id={extra.id} />
          <Label
            htmlFor={extra.id}
            className="text-sm text-accent font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {extra.name} {formatCurrency(extra.price)}
          </Label>
        </div>
      ))}
    </>
  );
}
