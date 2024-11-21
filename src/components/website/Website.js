"use client"
import React from 'react'
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import TabelComponent from './component/TabelComponent';
import TabelMenu from '../dashboard/setting/menu/TabelMenu';
import TabelSubMenu from '../dashboard/setting/menu/submenu/TabelSubMenu';

export default function Website() {
  return (
    <div>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options" color='secondary'>
        <Tab key="component" title="Component">
            <Card>
              <CardBody>
                <TabelComponent />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="menu" title="Menu">
            <Card>
              <CardBody>
                <TabelMenu />
                <TabelSubMenu />
              </CardBody>
            </Card>
          </Tab>          
        </Tabs>
      </div>
    </div>
  )
}
