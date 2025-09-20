interface SEOImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  className?: string;
  priority?: boolean;
}

const SEOImage = ({
  src,
  alt,
  width,
  height,
  loading = 'lazy',
  className = '',
  priority = false
}: SEOImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : loading}
      decoding="async"
      className={className}
    />
  );
};

export default SEOImage;