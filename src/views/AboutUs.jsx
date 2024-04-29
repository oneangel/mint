import React from "react";
import { Header } from "../components/dashboard/Header";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import images from '../const/persons'

export const AboutUs = () => {
  return (
    <div className="dark:bg-[#1A1A24]">
      <Header />
      <section className="flex h-screen">
        <div className="mx-auto my-auto">
          <h1 className="font-semibold text-center text-7xl">
            La mejor manera de controlar tus ganancias
          </h1>
          <p className="text-xl text-center">
            Mint te ayuda a controlar tus finanzas de una manera agil y sencilla
            para mantener una salud financiera.
          </p>
        </div>
      </section>
      <section className="flex h-screen">
        <div className="h-[400px] w-[80%] mx-auto overflow-x-auto flex">
          {/* Mapea sobre el array de imágenes para renderizar cada tarjeta */}
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0 mr-4">
              <Card isFooterBlurred radius="lg" className="h-full border-none">
                <Image
                  alt={image.name}
                  className="object-cover h-[400px] w-[200px]"
                  src={image.imageUrl}
                />
                <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%-_8px)] shadow-small ml-1 z-10">
                  <p className="text-tiny text-white/80">{image.name}</p>
                  <Button
                    className="text-white text-tiny bg-black/20"
                    variant="flat"
                    color="default"
                    radius="lg"
                    size="sm"
                  >
                    {image.role}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
