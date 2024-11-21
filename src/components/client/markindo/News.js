'use client'
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import NewsAll from "./NewsAll";
import AOS from 'aos';
import { useEffect } from "react";

export default function News() {

    useEffect(() => {
        AOS.init();
      }, [])

    return (
        <div data-aos='fade-up'>
            <div className='py-5'>
                <p className='text-2xl font-bold my-5 text-center'>News</p>
            </div>
            <div className="flex w-full flex-col">
                <Tabs aria-label="Options" fullWidth color="secondary">
                    <Tab key="all" title="All">
                        <NewsAll />
                    </Tab>
                    <Tab key="information" title="Information">
                        <Card>
                            <CardBody>
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab key="product" title="Product">
                        <Card>
                            <CardBody>
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab key="event" title="Event">
                        <Card>
                            <CardBody>
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}