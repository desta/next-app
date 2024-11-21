'use client'
import { Tabs, Tab } from "@nextui-org/react";
import TabelPages from "./TabelPages";
import TabelPagesCategory from "./pages_category/TabelPagesCategory";

export default function Pages() {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options" color="secondary">
        <Tab key="pages" title="Pages">
          <TabelPages />
        </Tab>
        <Tab key="category" title="Category">
          <TabelPagesCategory />
        </Tab>
      </Tabs>
    </div>
  );
}