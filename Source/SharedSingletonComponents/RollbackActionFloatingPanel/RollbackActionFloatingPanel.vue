<template lang="pug">

  include ../../../node_modules/hikari-frontend/Markup/HikariPug-Kernel.pug
  include ../../../node_modules/hikari-frontend/Markup/SvgIcons.pug

  transition(name="rollback_action_floating_panel")
    .RollbackActionFloatingPanel(v-show="relatedStoreModule.displayFlag")
      +Checkmark__Simple__Bold--MaterialDesignIcon.RollbackActionFloatingPanel-CheckmarkIcon
      .RollbackActionFloatingPanel-Text {{ relatedStoreModule.message }}
      button.RollbackActionFloatingPanel-Button(@click="relatedStoreModule.onClickRollbackButton")
        +Undo__Simple--MaterialDesignIcon.ButtonWithPrependedIcon-Icon
        | Undo
      button.RollbackActionFloatingPanel-Button.RollbackActionFloatingPanel-Button__Primary(@click="relatedStoreModule.dismiss")
        +Hide__StrikethroughEye__Filled--MaterialDesignIcon.ButtonWithPrependedIcon-Icon
        | Hide
</template>


<script lang="ts">

  /* --- 第三者団体依存性 -------------------------------------------------------------------------------------------- */
  import { Vue, Component } from "vue-property-decorator";
  import { getModule } from "vuex-module-decorators";

  /* --- データ ------------------------------------------------------------------------------------------------------- */
  import RollbackActionFloatingPanelStoreModule
    from "@Store/modules/AssociatedWithComponents/RollbackActionFloatingPanel";


  @Component
  export default class RollbackActionFloatingPanel extends Vue {
    private readonly relatedStoreModule: RollbackActionFloatingPanelStoreModule =
        getModule(RollbackActionFloatingPanelStoreModule);
  }
</script>


<style lang="stylus" scoped>
  .rollback_action_floating_panel-active
    transition opacity .5s

  .rollback_action_floating_panel-enter
    opacity 0
</style>
