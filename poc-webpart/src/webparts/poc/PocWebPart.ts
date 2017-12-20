import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import * as strings from 'PocWebPartStrings';
import * as angular from 'angular';
import '../../app/app-module';
import { PropertyPaneCheckbox } from '@microsoft/sp-webpart-base/lib/propertyPane/propertyPaneFields/propertyPaneCheckBox/PropertyPaneCheckbox';
import { PropertyPaneLink } from '@microsoft/sp-webpart-base/lib/propertyPane/propertyPaneFields/propertyPaneLink/PropertyPaneLink';

export interface IPocWebPartProps {
  description: string;
  title: string;
  link: string;
  popoverText: string;
  imageUrl: string;
  newTab: boolean;
}

export default class PocWebPartWebPart extends BaseClientSideWebPart<IPocWebPartProps> {
  private $injector: angular.auto.IInjectorService;
  public isInArray(value, array): boolean {
    let found: boolean = false;
    for (var i = 0; i < array.length; i++) {
      if (array[i] == value) {
        found = true;
        break;
      }
    }
    return found;
  }
  public render(): void {
    if (this.renderedOnce === false) {
      var columnSection = 2;
      var elementTxt = null;

      try {
        elementTxt = this.domElement.parentElement.parentElement.parentElement.parentElement.classList; // get the column count in a section
        if (elementTxt) {
          if (this.isInArray("ms-xl6", elementTxt)) {
            columnSection = 2;
          }
          else if (this.isInArray("ms-xl2", elementTxt)) {
            columnSection = 1;
          }
          else if (this.isInArray("ms-xl4", elementTxt)) {
            columnSection = 3;
          }
        }

        this.domElement.innerHTML = require<string>("../../app/main.template.html");
        this.$injector = angular.bootstrap(this.domElement, ['myPocApp']);
      }
      catch (e) {
        console.log(e);
      }


    }
    this.$injector.get('$rootScope').$broadcast('configurationChanged', {
      description: this.properties.description,
      imageUrl: this.properties.imageUrl,
      link: this.properties.link,
      popoverText: this.properties.popoverText,
      title: this.properties.title,
      newTab: this.properties.newTab,
      columnSection: columnSection
    });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel,
                  value: strings.Description,
                  maxLength: 50,
                  description: "Allowed limit 50",

                }),
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel,
                  value: strings.Title,
                  maxLength: 50,
                  description: "Allowed limit 50",
                }),
                PropertyPaneTextField('link', {
                  label: strings.LinkFieldLabel,
                  value: strings.Link,
                  description: "Redircetion URL on click of Tile"
                }),
                PropertyPaneCheckbox('newTab', {
                  text: "Open in new Tab",
                  checked: true,
                }),
                PropertyPaneTextField('popoverText', {
                  label: strings.PopoverFieldLabel,
                  value: strings.Popover,
                  maxLength: 500,
                  description: "Allowed limit 500",
                  rows: 3,
                  multiline: true
                }),
                PropertyPaneTextField('imageUrl', {
                  label: strings.ImageUrlFieldLabel,
                  value: strings.ImageUrl
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
