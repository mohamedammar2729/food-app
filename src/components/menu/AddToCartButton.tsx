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
import { Extra, Size } from "@prisma/client";
import { ProductWithRelations } from "@/Types/products";


function AddToCartButton({ product }: { product: ProductWithRelations }) {
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
            <PickSize sizes={product.sizes} product={product} />
          </div>
          <div className="space-y-4 text-center">
            <Label htmlFor="extra">Any extras?</Label>
            <Extras extras={product.extras} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full h-10">
            Add To Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddToCartButton;

function PickSize({
  sizes,
  product,
}: {
  sizes: Size[];
  product: ProductWithRelations;
}) {
  return (
    <RadioGroup defaultValue="comfortable">
      {sizes.map((size: any) => (
        <div
          key={size.id}
          className="flex items-center space-x-2 border border-gray-100 rounded-md p-4"
        >
          <RadioGroupItem value="default" id={size.id} />
          <Label htmlFor={size.id}>
            {size.name} {formatCurrency(product.baseprice + size.Price)}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

function Extras({ extras }: { extras: Extra[] }) {
  return (
    <>
      {extras.map((extra) => (
        <div
          key={extra.id}
          className="flex items-center space-x-2 border border-gray-100 rounded-md p-4"
        >
          <Checkbox id={extra.id} />
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
