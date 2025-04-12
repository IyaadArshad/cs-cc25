import { useState, useRef, useEffect } from "react";


export default function CaseCulture() {
  const isFirstRender = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }, 350);

    return () => clearTimeout(timeoutId);
  },);
  return (
    <div ref={containerRef} className="flex-1 p-5 overflow-y-auto">
        
        <div className="p-2">
            <h1 className="text-2xl font-bold mb-4 text-white">Culture</h1>
            <p className="text-gray-400">
                Emirati culture blends Bedouin traditions, Islamic values, and heritage. Hospitality, family, and community are key. Traditional arts thrive alongside modern advancements.
            </p>
        </div>
    </div>
  );
}
