import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import image1 from "../../assets/1.png";
import image2 from "../../assets/2.png";

const mockData = [
  {
    id: 1,
    title: "Slide 1",
    image: image1,
    description:
      "This is the first slideThis is the first slideThis is the first slideThis is the first slideThis is the first slideThis is the first slideThis is the first slideThis is the first slideThis is the first slideThis is the first slideThis is the first slide",
  },
  {
    id: 2,
    title: "Slide 2",
    image: image2,
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus, maxime dolorum nam incidunt mollitia cupiditate, sint corporis molestias eveniet sequi eius! Aliquam autem facilis fuga! Incidunt dolor praesentium enim ea?",
  },
  {
    id: 3,
    title: "Slide 3",
    description: "This is the third slide",
    
  },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mockData.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + mockData.length) % mockData.length,
    );
  };

  return (
    <div className="relative mx-auto w-full max-w-4xl px-4 py-8">
      {/* Main slider container */}
      <div className="relative overflow-hidden rounded-xl bg-white shadow-lg">
        {/* Slide content */}
        <div className="flex min-h-[400px] flex-col items-center bg-card p-6">
          {mockData[currentIndex].image && (
            <img
              src={mockData[currentIndex].image}
              alt={mockData[currentIndex].title}
              className="mb-6 h-64 w-full max-w-md rounded-lg object-cover"
            />
          )}
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            {mockData[currentIndex].title}
          </h2>
          <p className="max-w-2xl text-center text-gray-600">
            {mockData[currentIndex].description}
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between">
          <button
            onClick={prevSlide}
            className="ml-4 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-gray-800" />
          </button>
          <button
            onClick={nextSlide}
            className="mr-4 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-gray-800" />
          </button>
        </div>

        {/* Dots navigation */}
        <div className="absolute bottom-4 left-0 right-0">
          <div className="flex items-center justify-center gap-2">
            {mockData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  currentIndex === index
                    ? "w-4 bg-blue-500"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
