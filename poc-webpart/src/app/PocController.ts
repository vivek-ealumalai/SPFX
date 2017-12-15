export interface IMainViewModel {
    Message: string;
    Styles: any;
}

export default class PocController implements IMainViewModel {
    public Target: string = "_blank";
    public newItem: string = null;
    public Message: string;
    public Description: string;
    public Title: string;
    public Link: string;
    public PopoverText: string;
    public ImageUrl: string;
    public ColumnCount: number;
    public WrapperWidth: string;
    public iconBottom: string;
    
    
    public showSpinner: boolean = true;
    public static $inject: string[] = ['Styles', '$window', '$rootScope'];

    constructor(public Styles: any,
        private $window: angular.IWindowService,
        private $rootScope: angular.IRootScopeService,
        public thisMessage: string,
        private $http: ng.IHttpService) {
        const vm: PocController = this;

        $rootScope.$on('configurationChanged', (event: angular.IAngularEvent, args: {
            description: string,
            title: string,
            link: string,
            popoverText: string,
            imageUrl: string,
            colCount: number
        }): void => {
            vm.init(args);
        });

        // this.get();
    }

    private init(args): void {
        this.Description = args.description;
        this.Link = args.link;
        this.Title = args.title;
        this.PopoverText = args.popoverText;
        this.Target = args.newTab ? "_blank" : "_parent";
        this.ImageUrl = args.imageUrl;

        switch (args.columnSection) {
            case 1:
                this.WrapperWidth = "97%";
                this.iconBottom = "45px";
                break;
            case 2:
                this.WrapperWidth = "94.5%";
                this.iconBottom = "45px";
                
                break;
            case 3:
                this.WrapperWidth = "92%";
                this.iconBottom = "40px";
                
                break;
            default:
                this.WrapperWidth = "97%";
                this.iconBottom = "45px";
                
                break;
        }
        this.loadUI();
    }

    private loadUI(): void {
        const vm: PocController = this;
        this.showSpinner = false;
        this.$rootScope.$apply();
    }
}