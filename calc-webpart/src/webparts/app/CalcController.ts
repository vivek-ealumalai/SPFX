export interface IMainViewModel {
    Message: string;          
    Styles: any;                    
}
 
export class CalcController implements IMainViewModel {
 
    public static $inject = ["Styles"];
    
    // Define the ViewModel
    public Message: string;
 
    constructor (public Styles: any, public thisMessage: string) {  }
}