/* eslint-disable no-restricted-globals */

class CustomTimer {
  time: number = 0;
  timerInterval: NodeJS.Timer = setTimeout(() => {});
  status: 'off' | 'set' | 'on' = 'on';

  setTimer(newTimerInteveral: NodeJS.Timer) {
    this.timerInterval = newTimerInteveral;
  }

  setTime(newTime: number, newTimer: NodeJS.Timer) {
    this.time = newTime;
    this.setTimer(newTimer);
  }

  stopTime() {
    clearInterval(this.timerInterval);
  }

  resetTime() {}

  modifyTime(modifiedTime: number) {
    this.time = modifiedTime;
  }
}

const workercode = () => {
  let timerInterval: NodeJS.Timer;
  let time = 0;

  self.onmessage = function (event: {
    data: { turn: string; setTime: number };
  }) {
    const {
      data: { turn, setTime },
    } = event;

    if (turn === 'off' || timerInterval) {
      clearInterval(timerInterval);
      time = setTime;
    }

    if (turn === 'set') {
      clearInterval(timerInterval);
      time = setTime;
    }

    if (turn === 'stop') {
      clearInterval(timerInterval);
    }

    if (turn === 'on') {
      timerInterval = setInterval(() => {
        time -= 1;
        const message = { time };

        //타입 문제를 해결해야할 듯 .. 인자가 2개이상이 되면 안됨(window에서는 targetOrigin을 받아야하지만 worker가 데이터를 보낼떄는 없어도 됨?? 뭘까ㅣ)
        self.postMessage(message);
        if (time <= 0) clearInterval(timerInterval);
      }, 1000);
    }

    if (turn === 'reset') {
      clearInterval(timerInterval);
      time = setTime;
    }
  };
};

let code = workercode.toString();
code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));

const blob = new Blob([code], { type: 'application/javascript' });
const worker_script = URL.createObjectURL(blob);

export default worker_script;
