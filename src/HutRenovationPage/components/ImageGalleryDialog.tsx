import { Dialog, DialogContent, Fab, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useEffect, useState } from 'react';
import type { FileImage } from '../../common/types';

import '../less/imageGalleryDialog.less';

interface ImageGalleryDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  images: FileImage[];
}

export const ImageGalleryDialog = ({ open, setOpen, images }: ImageGalleryDialogProps) => {

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const handleClose = () => {
    setOpen(false);
  };

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

  /* allow navigation with left and right arrow keys */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable) {
          return; // ignore typing
        }
      }

      if (event.key === 'Escape') {
        // Ensure the controlled dialog's close handler is called (use setOpen directly)
        setOpen(false);
        return;
      }

      if (event.key === 'ArrowRight') {
        setCurrentImageIndex(prev => Math.min(prev + 1, images.length - 1));
      } else if (event.key === 'ArrowLeft') {
        setCurrentImageIndex(prev => Math.max(prev - 1, 0));
      }
    };

    if (open) {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [open, images.length]);

  /* Reset to first image when reopening the dialog */
  useEffect(() => {
    if (open) {
      setCurrentImageIndex(0);
    }
  }, [open]);

  return (
    <Dialog
      className='image-gallery-dialog'
      open={open}
      onClose={handleClose}
      maxWidth='xl'
      fullWidth
      data-testid='image-gallery-dialog'
    >
      <IconButton
        aria-label='close'
        className='image-gallery-dialog__close-button'
        onClick={handleClose}
        data-testid='image-gallery-dialog-close-button'
      >
        <CloseIcon />
      </IconButton>
      <Fab
        color='primary'
        aria-label='previous'
        disabled={currentImageIndex === 0}
        onClick={onClickPrev}
        className='image-gallery-dialog__nav-button prev'
        data-testid='image-gallery-dialog-prev-button'
      >
        <KeyboardArrowLeft />
      </Fab>
      <Fab
        color='primary'
        aria-label='next'
        disabled={currentImageIndex === images.length - 1}
        onClick={onClickNext}
        className='image-gallery-dialog__nav-button next'
        data-testid='image-gallery-dialog-next-button'
      >
        <KeyboardArrowRight />
      </Fab>
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
