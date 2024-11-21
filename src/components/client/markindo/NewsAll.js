'use client'
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";

export default function NewsAll() {
    return (
        <div className="text-sm md:text-lg">
            <div className="flex gap-4 pb-5 overflow-x-auto">
                <div className="min-w-[300px]">
                    <Card>
                        <CardBody className="overflow-visible">
                            <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                src="https://nextui.org/images/hero-card-complete.jpeg"

                                classNames={
                                    {
                                        container: "h-48 w-full",
                                        img: "object-cover"
                                    }
                                }
                            />
                            <div className="flex flex-col gap-2 py-5">
                                <p className="text-md">28 April 2024</p>
                                <p className="font-bold text-sm">Information</p>
                                <p className="font-bold text-lg">Information Packaging Pack Go International</p>
                                <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type...</p>
                                <p className="text-default-500 font-bold text-sm mt-2">Read detail</p>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="min-w-[300px]">
                    <Card>
                        <CardBody className="overflow-visible">
                            <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                src="https://nextui.org/images/hero-card-complete.jpeg"

                                classNames={
                                    {
                                        container: "h-48 w-full",
                                        img: "object-cover"
                                    }
                                }
                            />
                            <div className="flex flex-col gap-2 py-5">
                                <p className="text-md">28 April 2024</p>
                                <p className="font-bold text-sm">Information</p>
                                <p className="font-bold text-lg">Information Packaging Pack Go International</p>
                                <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type...</p>
                                <p className="text-default-500 font-bold text-sm mt-2">Read detail</p>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="min-w-[300px]">
                    <Card>
                        <CardBody className="overflow-visible">
                            <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                src="https://nextui.org/images/hero-card-complete.jpeg"

                                classNames={
                                    {
                                        container: "h-48 w-full",
                                        img: "object-cover"
                                    }
                                }
                            />
                            <div className="flex flex-col gap-2 py-5">
                                <p className="text-md">28 April 2024</p>
                                <p className="font-bold text-sm">Information</p>
                                <p className="font-bold text-lg">Information Packaging Pack Go International</p>
                                <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type...</p>
                                <p className="text-default-500 font-bold text-sm mt-2">Read detail</p>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="py-5 text-center"><a href="#" className="px-10 py-2 rounded-medium text-white bg-blue-800 ">Read More News</a></div>
        </div>

    );
}