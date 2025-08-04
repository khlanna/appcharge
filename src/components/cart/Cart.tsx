import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/Sheet";
import { useCartStore } from "@/store/cart-store";
import { CartTrigger } from "./CartTrigger";
import { CartList } from "./CartList";
import { CartEmpty } from "./CartEmpty";
import { CartSummary } from "./CartSummary";

export function Cart() {
  const { items, isOpen, setIsOpen, getTotalItems } = useCartStore();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <CartTrigger />
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({getTotalItems()} items)</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <CartEmpty />
          ) : (
            <>
              <CartList />
              <CartSummary />
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
