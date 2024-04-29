import React from "react";
import { Header } from "../components/dashboard/Header";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import marin from '../assets/img/ricardo.png'

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
        <div className="bg-green-400 h-[500px] w-full mx-20 overflow-x-scroll flex flex-wrap">
          <Card isFooterBlurred radius="lg" className="border-none">
            <Image
              alt="marin"
              className="object-cover"
              src={marin}
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80">Available soon.</p>
              <Button
                className="text-white text-tiny bg-black/20"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
              >
                Notify me
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
};
