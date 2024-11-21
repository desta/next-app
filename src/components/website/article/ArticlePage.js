'use client'
import { Tabs, Tab } from "@nextui-org/react";
import TabelArticle from "./TabelArticle";
import TabelArticleCategory from "./article_category/TabelArticleCategory";

export default function ArticlePage() {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options" color="secondary">
        <Tab key="article" title="Article">
          <TabelArticle />
        </Tab>
        <Tab key="category" title="Article category">
          <TabelArticleCategory />
        </Tab>

      </Tabs>
    </div>
  );
}