import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";

import store from "@Store/Store";


@Module({
  name: "VUEX_MODULE:ROLLBACK_ACTION_FLOATING_PANEL",
  store,
  dynamic: true,
  namespaced: true
})
export default class RollbackActionFloatingPanelStoreModule extends VuexModule {


  private static readonly AUTO_HIDE_TIMEOUT__MILLISECONDS: number = 5000;

  private _displayFlag: boolean = false;
  private _message: string = "";

  private _onClickRollbackButton: Function = () => {};


  @Action
  public displayAndHideALittleLater(
      {
        message,
        onClickRollbackButton
      }: {
        message: string;
        onClickRollbackButton: Function;
      }
  ): void {

    this.setMessage(message);
    this.setOnClickRollbackButtonEventHandler(onClickRollbackButton);
    this.display();

    setTimeout(
        (): void => { this.dismiss(); },
        RollbackActionFloatingPanelStoreModule.AUTO_HIDE_TIMEOUT__MILLISECONDS
    );
  }

  @Action
  public onClickRollbackButton(): void {
    this._onClickRollbackButton();
  }

  @Mutation
  private setMessage(message: string): void {
    this._message = message;
  }

  @Mutation
  private setOnClickRollbackButtonEventHandler(newHandler: Function): void {
    this._onClickRollbackButton = newHandler;
  }

  @Mutation
  private display(): void {
    this._displayFlag = true;
  }

  @Mutation
  public dismiss(): void {
    this._displayFlag = false;
    this._onClickRollbackButton = () => {};
  }

  public get displayFlag(): boolean { return this._displayFlag; }
  public get message(): string { return this._message; }
}
