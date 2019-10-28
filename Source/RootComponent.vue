<template lang="pug">
fragment
  .Layout
    .Layout-MainContent
      .SplitView
        .SplitView-Section
          .SplitView-Section-Heading Selected
          Draggable(
            v-model="selectedItems"
            :group="{ name: 'VUE_DRAGGABLE_RELATED_LISTS_GROUP_ID' }"
            class="CardsLayout"
          )
            .CardView(
              v-for="item in selectedItems"
              :key="item.id"
            )
              span {{ item.title }}
              .CardView-LinkButton(@click="() => { relatedStoreModule.removeItem(item.id) }") Delete
        .SplitView-Section
          .SplitView-Section-Heading Suggested
          Draggable(
            v-model="suggestedItems"
            :group="{ name: 'VUE_DRAGGABLE_RELATED_LISTS_GROUP_ID' }"
            class="CardsLayout"
          )
            .CardView(
              v-for="item in suggestedItems"
              :key="item.id"
            )
              span {{ item.title }}

  RollbackActionFloatingPanel
</template>


<script lang="ts">

  import { Vue, Component } from "vue-property-decorator";
  import { getModule } from "vuex-module-decorators";
  import Draggable from "vuedraggable";

  import RollbackActionFloatingPanel
    from "@SourceFiles:Root/SharedSingletonComponents/RollbackActionFloatingPanel/RollbackActionFloatingPanel.vue";
  import RollbackActionFloatingPanelStoreModule
    from "@Store/modules/AssociatedWithComponents/RollbackActionFloatingPanel";
  import TopPageStoreModule from "@Store/modules/AssociatedWithPages/Top";

  import { Item } from "@SourceFiles:Root/Types/Types";


  @Component({
    components: {
      RollbackActionFloatingPanel,
      Draggable
    }
  })
  export default class Application extends Vue {

    private readonly relatedStoreModule: TopPageStoreModule =
        getModule(TopPageStoreModule);
    private readonly rollbackActionFloatingPanelStoreModule: RollbackActionFloatingPanelStoreModule =
        getModule(RollbackActionFloatingPanelStoreModule);

    private readonly VUE_DRAGGABLE_RELATED_LISTS_GROUP_ID: string = "LISTS_UNIQUE_ID";


    private get selectedItems(): Array<Item> {
      return this.relatedStoreModule.selectedItems;
    }

    private set selectedItems(updatedSelectedItems: Array<Item>) {
      this.relatedStoreModule.updateSelectedItems(updatedSelectedItems);
    }

    private get suggestedItems(): Array<Item> {
      return this.relatedStoreModule.suggestedItems;
    }

    private set suggestedItems(updatedSuggestedItems: Array<Item>) {
      this.relatedStoreModule.updateSuggestedItems(updatedSuggestedItems);
    }
  }
</script>
