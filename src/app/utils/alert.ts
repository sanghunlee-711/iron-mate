import { ICustomAlert } from '../interfaces/alert';

export default class CustomAlert implements ICustomAlert {
  constructor() {}

  toast = (message: string) => {
    global?.window?.alert(message);
  };
}
