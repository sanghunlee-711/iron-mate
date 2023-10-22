import { IAlert } from '../interface/alert';

export default class CustomAlert implements IAlert {
  constructor() {}

  toast = (message: string) => {
    global?.window?.alert(message);
  };
}
