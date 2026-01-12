import { Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useState } from 'react';
import type { FileImage } from '../../common/types';

import '../less/imageGalleryDialog.less';

interface ImageGalleryDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  images: FileImage[];
}

export const ImageGalleryDialog = ({ open, setOpen, images }: ImageGalleryDialogProps) => {

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const onClickNext = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  };

  const onClickPrev = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  };

  return (
    <Dialog className='image-gallery-dialog' open={open} maxWidth='xl' fullWidth data-testid='image-gallery-dialog'>
      <IconButton
        aria-label='close'
        className='image-gallery-dialog__close-button'
        onClick={() => setOpen(false)}
        data-testid='image-gallery-dialog-close-button'
      >
        <CloseIcon />
      </IconButton>
      <IconButton
        aria-label='previous'
        className='image-gallery-dialog__nav-button prev'
        onClick={onClickPrev}
        disabled={currentImageIndex === 0}
        data-testid='image-gallery-dialog-prev-button'
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        aria-label='next'
        className='image-gallery-dialog__nav-button next'
        onClick={onClickNext}
        disabled={currentImageIndex === images.length - 1}
        data-testid='image-gallery-dialog-next-button'
      >
        <KeyboardArrowRight />
      </IconButton>
      <DialogContent className='image-gallery-dialog__content'>
        <img
          src={images[currentImageIndex].src}
          alt={images[currentImageIndex].alt}
          data-testid='image-gallery-dialog-image'
        />
      </DialogContent>
    </Dialog>
  );
};
