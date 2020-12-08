<template>
  <div>
    <v-list two-line subheader>
      <v-subheader>Interventions</v-subheader>

      <v-list-item v-for="item in interventions" :key="item.title">
        <v-list-item-avatar>
          <v-icon :class="[item.iconClass]" v-text="item.icon"></v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <v-divider></v-divider>

      <v-subheader>Checklists</v-subheader>

      <v-list-item v-for="item in checklists" :key="item.title">
        <v-list-item-avatar>
          <v-icon :class="[item.iconClass]" v-text="item.icon"></v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-container>
      <v-row>
        <v-col></v-col>
        <v-col>
          <ComposeChecklist></ComposeChecklist>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ComposeChecklist from '@components/checklist-compose.vue'
export default {
  components: {
    ComposeChecklist,
  },
  data: () => ({
    interventions: [
      {
        title: 'Winter',
        created: '2019-12-17',
        subtitle: 'feeding',
        open: [],
        selection: [],
        icon: 'mdi-beehive-outline',
      },
    ],
    checklists: [
      {
        title: 'Spring',
        created: '2019-05-17',
        subtitle: 'colony check',
        open: [],
        selection: [],
        icon: 'mdi-beehive-outline',
      },
    ],
  }),
  computed: {},
}
</script>
