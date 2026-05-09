import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { JoinInformation } from './JoinInformation';

const defaultProps = {
  textLines: ['Line 1', 'Line 2', 'Line 3'],
  activityLines: ['Activity 1', 'Activity 2', 'Activity 3'],
};

it('should render JoinInformation correctly', () => {
  render(<JoinInformation {...defaultProps} />);

  expect(screen.getByTestId('join-info')).toBeInTheDocument();
  expect(screen.getByTestId('join-info-list')).toBeInTheDocument();
  defaultProps.textLines.forEach((line) => {
    expect(screen.getByText(line)).toBeInTheDocument();
  });

  expect(screen.getByTestId('join-info-card')).toBeInTheDocument();
  expect(screen.getByText('Activities')).toBeInTheDocument();
  defaultProps.activityLines.forEach((line) => {
    expect(screen.getByText(line)).toBeInTheDocument();
  });
});
