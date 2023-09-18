import Timer from '../Timer';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { intToStringFormat } from '../../utils/format';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('<Timer />', () => {
  const INITIAL_TIME = {
    hh: 0,
    mm: 0,
    ss: 2,
  };

  it('시작 버튼 클릭 전 초기 시간이 렌더 되는지', () => {
    render(<Timer targetTime={INITIAL_TIME} />);

    const $hours = screen.getByLabelText('hours-input') as HTMLInputElement;
    const $minutes = screen.getByLabelText('minutes-input') as HTMLInputElement;
    const $seconds = screen.getByLabelText('seconds-input') as HTMLInputElement;

    expect($hours.value).toBe(intToStringFormat(INITIAL_TIME.hh));
    expect($minutes.value).toBe(intToStringFormat(INITIAL_TIME.mm));
    expect($seconds.value).toBe(intToStringFormat(INITIAL_TIME.ss));
  });

  it('시작 버튼을 클릭하면 버튼이 정지 버튼으로 변경되고 시간이 흘러가야 함.', async () => {
    render(<Timer targetTime={INITIAL_TIME} />);

    const $startBtn = screen.getByRole('button', { name: 'start' });

    await userEvent.click($startBtn);

    const $stopBtn = screen.getByRole('button', { name: 'stop' });
    expect($stopBtn).toBeInTheDocument();

    await act(async () => await sleep(INITIAL_TIME.ss * 1000));

    expect($startBtn).toBeInTheDocument();
  });

  it('정해진 시간이 흘러간 뒤 초기시간으로 다시 변경이 되어야 함.', async () => {
    render(<Timer targetTime={INITIAL_TIME} />);

    const $startBtn = screen.getByRole('button', { name: 'start' });

    await userEvent.click($startBtn);

    await act(async () => await sleep((INITIAL_TIME.ss + 1) * 1000));

    const $hours = screen.getByLabelText('hours-input') as HTMLInputElement;
    const $minutes = screen.getByLabelText('minutes-input') as HTMLInputElement;
    const $seconds = screen.getByLabelText('seconds-input') as HTMLInputElement;

    expect($hours.value).toBe(intToStringFormat(INITIAL_TIME.hh));
    expect($minutes.value).toBe(intToStringFormat(INITIAL_TIME.mm));
    expect($seconds.value).toBe(intToStringFormat(INITIAL_TIME.ss));
  });
});

export {};
