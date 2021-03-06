import { UserService } from '../../common/services/PeoplePickerService';
import { ServiceFactory } from '../../common/services/ServiceFactory';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ProjectTeamMembersWebPartStrings';
import ProjectsList from './components/ProjectTeamMembers';
import { IProjectTeamMembersProps } from './components/ProjectTeamMembers';
import { log } from '../../common/Utils';

export interface IProjectTeamMembersWebPartProps {
  description: string;
}

export default class ProjectsListWebPart extends BaseClientSideWebPart<IProjectTeamMembersWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IProjectTeamMembersProps> = React.createElement(
      ProjectsList,
      {
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
