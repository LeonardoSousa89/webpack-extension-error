declare namespace emailjs {
    function init(userID: string): void;
  
    function send(
      serviceID: string, 
      templateID: string, 
      templateParams: Record<string, any>, 
      userID?: string
    ): Promise<{ status: number; text: string }>;
  
    function sendForm(
      serviceID: string, 
      templateID: string, 
      form: HTMLFormElement
    ): Promise<{ status: number; text: string }>;
  }
  