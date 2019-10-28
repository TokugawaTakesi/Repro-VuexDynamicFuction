import { VuexModule, Module, Mutation, getModule } from "vuex-module-decorators";
import store from "@Store/Store";
import {
  removeSingleElementFromArrayOfStringsOrNumbersMutably,
  removeSingleElementFromArrayByPredicateMutably
} from "hikari-es-extensions/BrowserJS";

import RollbackActionFloatingPanelStoreModule
  from "@Store/modules/AssociatedWithComponents/RollbackActionFloatingPanel";

import { Item } from "@SourceFiles:Root/Types/Types";


@Module({
  name: "VUEX_MODULE:TOP_PAGE",
  store,
  dynamic: true,
  namespaced: true
})
export default class TopPageStoreModule extends VuexModule {

  private _selectedItems: Array<Item> = [
    { id: "ITEM_1", title: "item1" },
    { id: "ITEM_2", title: "item2" },
    { id: "ITEM_3", title: "item3" }
  ];
  private _suggestedItems: Array<Item> = [];
  private _lastDeletedItem: Item | null = null;


  public get selectedItems(): Array<Item> {
    return this._selectedItems;
  }

  public get suggestedItems(): Array<Item> {
    return this._suggestedItems;
  }


  @Mutation
  public updateSelectedItems(updatedSelectedItems: Array<Item>): void {
    this._selectedItems = updatedSelectedItems;
  }

  @Mutation
  public updateSuggestedItems(updatedSuggestedItems: Array<Item>): void {
    this._suggestedItems = updatedSuggestedItems;
  }

  @Mutation
  public removeItem(targetSettingsGroupId: string): void {

    const targetItemSearchingPredicate:
        (item: Item) => boolean = (item: Item): boolean => item.id === targetSettingsGroupId;

    const targetItem: Item | undefined =
        this._selectedItems.find(targetItemSearchingPredicate);
    if (typeof targetItem === "undefined") { return; }

    this._lastDeletedItem = targetItem;
    removeSingleElementFromArrayByPredicateMutably(
        this._selectedItems, targetItemSearchingPredicate
    );

    getModule(RollbackActionFloatingPanelStoreModule).displayAndHideALittleLater({
      message: "Item has been deleted",
      onClickRollbackButton: (): void => { this.rollbackRemoveItem(); }
    });
  }

  @Mutation
  public rollbackRemoveItem(): void {
    if (this._lastDeletedItem === null) { return; }
    this._selectedItems.unshift(this._lastDeletedItem);
    this._lastDeletedItem = null;
  }


  // /* --- 未整理 ------------------------------------------------------------------------------------------------------ */
  // /** 〔理論〕 VuexはES6の"Map"に対応されていないので、配列に探さざる得ない */
  // public get getEntryPointsGroupSettingsById(): (id: string) => MarkupEntryPointGroupSettingsModelForGUI {
  //   return (id: string): MarkupEntryPointGroupSettingsModelForGUI => {
  //     const desiredEntryPointsGroupSettings: MarkupEntryPointGroupSettingsModelForGUI | undefined =
  //         [ ...this._selectedEntryPointsGroups, ...this._suggestedEntryPointsGroups ].find(
  //             (entryPointsGroupSettings: MarkupEntryPointGroupSettingsModelForGUI): boolean =>
  //                 entryPointsGroupSettings.id === id
  //         );
  //     if (typeof desiredEntryPointsGroupSettings === "undefined") {
  //       throw new Error("未処理エラーA4：必要な入点群設定は発見されず");
  //     }
  //     return desiredEntryPointsGroupSettings;
  //   };
  // }
  //
  // /** 〔論理〕　"getEntryPointsGroupSettingsById"は@Mutationから呼び出されない。 */
  // private static extractSelectedSettingsGroupById(
  //     targetSelectedEntryPointsGroupId: string,
  //     selectedEntryPointsGroups: Array<MarkupEntryPointGroupSettingsModelForGUI>
  // ): MarkupEntryPointGroupSettingsModelForGUI {
  //   const desiredEntryPointsGroupSettings: MarkupEntryPointGroupSettingsModelForGUI | undefined =
  //       selectedEntryPointsGroups.find(
  //           (entryPointsGroupSettings: MarkupEntryPointGroupSettingsModelForGUI): boolean =>
  //               entryPointsGroupSettings.id === targetSelectedEntryPointsGroupId
  //       );
  //   if (typeof desiredEntryPointsGroupSettings === "undefined") {
  //     throw new Error("未処理エラーA7：必要な入点群設定は発見されず");
  //   }
  //   return desiredEntryPointsGroupSettings;
  // }
}
