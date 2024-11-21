'use client'
import { Tabs, Tab } from "@nextui-org/react";
import TabelProduct from "./TabelProduct";
import TabelProductCategory from "./product_category/TabelProductCategory";
import TabelProductType from "./product_type/TabelProductType";

export default function ProductPage() {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options" color="secondary">
        <Tab key="product" title="Product">
          <TabelProduct />
        </Tab>
        <Tab key="productType" title="Product Type">
          <TabelProductType />
        </Tab>
        <Tab key="category" title="Category">
          <TabelProductCategory />
        </Tab>

      </Tabs>
    </div>
  );
}