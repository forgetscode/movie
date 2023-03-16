import React, { useState } from 'react';
import Image from 'next/legacy/image';

interface Props {
  src: string;
  fallbackSrc: string;
}

const ImageWithFallback = (props: Props) => {
  const { src, fallbackSrc, ...rest } = props;
  const [isImageReady, setIsImageReady] = useState(false);

  return (
    <div className="relative rounded-sm object-cover md:rounded w-full h-full">
      {!isImageReady && (
        <div className="absolute inset-0 bg-gray-500 ring-2 ring-[#141414] animate-pulse" />
      )}
      <Image
        {...rest}
        src={src}
        onError={() => {
          setIsImageReady(true);
        }}
        onLoad={() => {
          setIsImageReady(true);
        }}
        alt=""
        layout="fill"
      />
    </div>
  );
};

export default ImageWithFallback;
