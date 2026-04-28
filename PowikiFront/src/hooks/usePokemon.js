import { useState } from "react";

export function usePokemon() {

  const [isPixel, setIsPixel] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [currentGen, setCurrentGen] = useState(0);
  const [formType, setFormType] = useState("default");
  const [imageType, setImageType] = useState("ARTWORK");
 
  const togglePixel = () => {
    const nextValue = !isPixel;
    setIsPixel(nextValue);
    setImageType(nextValue ? "PIXEL" : "ARTWORK");
  };

  const handleKeyword = (value) => {
    setKeyword(value);
  };

  const handleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleGen = (gen) => {
    setCurrentGen((prev) =>
      prev === gen ? 0 : gen
    );
  };

  const handleFormType = (value) => {
    setFormType(value);
  };

  const handleImageType = (value) => {
    setImageType(value);
  };

  return {
    isPixel,
    keyword,
    selectedTypes,
    currentGen,
    formType,
    imageType,
    togglePixel,
    handleKeyword,
    handleType,
    handleGen,
    handleFormType,
    handleImageType,
  };
}