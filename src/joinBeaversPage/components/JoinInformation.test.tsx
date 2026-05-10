import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { JoinInformation } from './JoinInformation';

const defaultProps = {
  textLines: ['Line 1', 'Line 2', 'Line 3'],
  activityLines: ['Activity 1', 'Activity 2', 'Activity 3'],
};

const renderJoinInformation = () =>
  render(<JoinInformation {...defaultProps} />);

describe('JoinInformation', () => {
  it('renders the information section', () => {
    renderJoinInformation();

    expect(screen.getByTestId('join-info')).toBeInTheDocument();
  });

  it.each(
    defaultProps.textLines,
  )('renders the information text line "%s"', (line) => {
    renderJoinInformation();

    expect(screen.getByText(line)).toBeInTheDocument();
  });

  it('renders the activities card', () => {
    renderJoinInformation();

    expect(screen.getByTestId('join-info-card')).toBeInTheDocument();
  });

  it('renders the activities heading', () => {
    renderJoinInformation();

    expect(screen.getByText('Activities')).toBeInTheDocument();
  });

  it.each(
    defaultProps.activityLines,
  )('renders the activity line "%s"', (line) => {
    renderJoinInformation();

    expect(screen.getByText(line)).toBeInTheDocument();
  });
});
