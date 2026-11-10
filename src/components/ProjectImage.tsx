import type { ProjectImage as ProjectImageData } from '../content/types';
import { publicUrl } from '../routing';

interface ProjectImageProps {
  image: ProjectImageData;
  /** Image visible dès l'arrivée sur la page : chargée sans attendre. */
  eager?: boolean;
}

export function ProjectImage({ image, eager = false }: ProjectImageProps) {
  return (
    <img
      className="capture"
      src={publicUrl(`captures/${image.fileName}`)}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
