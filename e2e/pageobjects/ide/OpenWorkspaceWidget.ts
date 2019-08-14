/*********************************************************************
 * Copyright (c) 2019 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 **********************************************************************/
import { injectable, inject } from 'inversify';
import { CLASSES } from '../../inversify.types';
import { DriverHelper } from '../../utils/DriverHelper';
import { By } from 'selenium-webdriver';

export enum OpenWorkspaceRootItems {
    ProjectRoot = 'prjects',
    DefaultRoot = '/'
}

@injectable()
export class OpenWorkspaceWidget {
    private static readonly OPEN_WORKSPACE_MAIN_VIEW_XPATH = '//div[@class=\'dialogTitle\']/div[text()=\'Open Workspace\']';
    private static readonly OPEN_WORKSPACE_OPEN_BTN_CSS = 'div.dialogControl>button.main';


    constructor(@inject(CLASSES.DriverHelper) private readonly driverHelper: DriverHelper) {
    }

   async waitOpenWorkspaceWidget() {
        await this.driverHelper.waitVisibility(By.xpath(OpenWorkspaceWidget.OPEN_WORKSPACE_MAIN_VIEW_XPATH));
    }

    async waitWidgetIsClosed() {
        await this.driverHelper.waitDisappearance(By.xpath(OpenWorkspaceWidget.OPEN_WORKSPACE_MAIN_VIEW_XPATH));
    }

    async selectItemInTree(rootEntry: string, itemURI: string) {
        await this.driverHelper.waitAndClick(By.id(`/${rootEntry}/${itemURI}`));
    }

    async clickOnOpenButton() {
        await this.driverHelper.waitAndClick(By.css(OpenWorkspaceWidget.OPEN_WORKSPACE_OPEN_BTN_CSS));
    }

    async selectItemInTreeAndOpenWorkspace(rootEntry: string, itemURI: string) {
         this.selectItemInTree(rootEntry, itemURI);
         this.clickOnOpenButton();
         this.waitWidgetIsClosed();
    }


}
