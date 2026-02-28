import { Card, CardContent, CardHeader } from '@mui/material';
import { useTranslation } from 'react-i18next';

import '../less/joinInformation.less';

interface JoinInformationProps {
  textLines: string[];
  activityLines: string[];
}

export const JoinInformation = ({ textLines, activityLines }: JoinInformationProps) => {

  const { t } = useTranslation();

  return (
    <div className='join-information' data-testid='join-info'>
      <ul className='join-information__list' data-testid='join-info-list'>
        {textLines.map((line, i) => (
          <li key={`join-info-line-${i}`}>{line}</li>
        ))}
      </ul>
      <Card className='join-information__card' data-testid='join-info-card'>
        <CardHeader
          className='join-information__card__header'
          title={t('join.common.activities')}
        />
        <CardContent className='join-information__card__content'>
          <ul>
            {activityLines.map((line, i) => (
              <li key={`activity-line-${i}`}>{line}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
