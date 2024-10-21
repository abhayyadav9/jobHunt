import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "Graphic Designer",
];

const CategoryCarousel = () => {
  return (
    <div className="bg-gray-30 py-10">
      <Carousel className="w-full max-w-xl mx-auto">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-4">
              <Button 
                variant="outline" 
                className="rounded-full transition-transform transform hover:scale-105 hover:bg-gray-200"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
