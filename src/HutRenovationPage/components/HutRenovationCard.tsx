import Image from '@mui/icons-material/ImageOutlined';
import { Card, CardContent, CardHeader, CardMedia, IconButton } from '@mui/material';
import type { ReactElement } from 'react';

export interface HutRenovationCardProps {
  title: string;
  mainImagePath: string;
  description: string | ReactElement;
  // TODO: support the additional images -> action button to open a gallery dialog
}

export const HutRenovationCard = ({ title, mainImagePath, description }: HutRenovationCardProps) => {
  return (
    <div className='hut-renovation-card' data-testid='hut-renovation-card'>
      <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <CardMedia image={mainImagePath} sx={{ height: 165 }} data-testid='hut-renovation-card-image' />
        <CardHeader
          title={title}
          action={
            <IconButton aria-label={`${title}-image`} data-testid='hut-renovation-card-button'>
              <Image />
            </IconButton>
          }
        >
        </CardHeader>
        <CardContent sx={{ flex: '1 1 auto' }}>{description}</CardContent>
      </Card>
    </div>
  );
};
