declare interface IPocWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  Description: string;
  TitleFieldLabel: string;
  Title: string;
  LinkFieldLabel: string;
  Link: string;
  ImageUrlFieldLabel: string;
  ImageUrl: string;
  PopoverFieldLabel: string;
  Popover: string;
}

declare module 'PocWebPartStrings' {
  const strings: IPocWebPartStrings;
  export = strings;
}
