export default class CustomAlert {
  constructor() {}

  toast = (message: string) => {
    global?.window?.alert(message);
  };
}
