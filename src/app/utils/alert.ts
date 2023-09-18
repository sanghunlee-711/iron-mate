export default class CustomAlert {
  constructor() {}

  isClient = () => {
    return typeof window !== 'undefined';
  };

  toast = (message: string) => {
    if (this.isClient()) window?.alert(message);
  };
}
