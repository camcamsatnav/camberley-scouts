import Image from '@mui/icons-material/ImageOutlined';
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
} from '@mui/material';
import { type ReactElement, useState } from 'react';
import type { FileImage } from '../../common/types';
import { ImageGalleryDialog } from './ImageGalleryDialog';

import '../less/hutRenovationCard.less';

export interface HutRenovationCardProps {
  title: string;
  mainImagePath: string;
  description: string | ReactElement;
  galleryImages: FileImage[];
}

export const HutRenovationCard = ({
  title,
  mainImagePath,
  description,
  galleryImages,
}: HutRenovationCardProps) => {
  const [imageGalleryOpen, setImageGalleryOpen] = useState<boolean>(false);

  const handleOnClick = () => {
    setImageGalleryOpen(true);
  };

  return (
    <div className='hut-renovation-card' data-testid='hut-renovation-card'>
      <Card className='hut-renovation-card__card'>
        <CardMedia
          className='hut-renovation-card__image'
          image={mainImagePath}
          data-testid='hut-renovation-card-image'
        />
        <CardHeader
          title={title}
          action={
            <IconButton
              aria-label={`${title}-image`}
              onClick={handleOnClick}
              data-testid='hut-renovation-card-button'
            >
              <Image />
            </IconButton>
          }
        />
        <CardContent className='hut-renovation-card__content'>
          {description}
        </CardContent>
      </Card>
      <ImageGalleryDialog
        open={imageGalleryOpen}
        setOpen={setImageGalleryOpen}
        images={galleryImages}
      />
    </div>
  );
};
