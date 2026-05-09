import type { FileImage } from '../../common/types';

import '../less/joinImages.less';

interface JoinImagesProps {
  images: FileImage[];
}

export const JoinImages = ({ images }: JoinImagesProps) => {
  return (
    <div className='join-images' data-testid='join-images'>
      {images.map((image) => (
        <img key={image.src} src={image.src} alt={image.alt} />
      ))}
    </div>
  );
};
