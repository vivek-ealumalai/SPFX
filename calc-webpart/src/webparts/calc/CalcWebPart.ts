import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './CalcWebPart.module.scss';
import * as strings from 'CalcWebPartStrings';
import * as angular from 'angular';
import {CalcController} from '../app/CalcController';

export interface ICalcWebPartProps {
  description: string;
}

export default class CalcWebPart extends BaseClientSideWebPart<ICalcWebPartProps> {

  public render(): void {

    if (!this.renderedOnce) {
      this.domElement.innerHTML = require<string>("../app/calc-template.html");

      angular.module('calcApp', [])
             .constant ('Styles', styles)
             .controller('CalcController', CalcController);
      angular.bootstrap(this.domElement, ['calcApp']);

    // this.domElement.innerHTML = `
    //   <div class="${ styles.calc }">
    //     <div class="${ styles.container }">
    //       <div class="${ styles.row }">
    //         <div class="${ styles.column }">
    //           <span class="${ styles.title }">Welcome to SharePoint!</span>
    //           <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
    //           <p class="${ styles.description }">${escape(this.properties.description)}</p>
    //           <a href="https://aka.ms/spfx" class="${ styles.button }">
    //             <span class="${ styles.label }">Learn more</span>
    //           </a>
    //         </div>
    //       </div>
    //     </div>
    //   </div>`;
    }
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
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
