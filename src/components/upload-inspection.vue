<template>
  <v-row class="mx-0 mx-sm-4">
    <v-col class="d-flex flex-wrap">
      <template v-for="pageNr in totalPages">
        <div
          :key="'page' + pageNr"
          class="d-flex flex-column justify-space-between upload-page rounded-border mr-3"
        >
          <span
            class="d-flex justify-end"
            v-text="'p.' + pageNr + ' / ' + totalPages"
          ></span>
          <v-btn tile outlined @click="uploadPage">
            <v-icon left>mdi-upload</v-icon>{{ 'Upload' }}
          </v-btn>
        </div>
      </template>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    selectedChecklist: {
      type: Object,
      default: null,
      required: true,
    },
    totalPages: {
      type: Number,
      default: 4, // TODO: remove dummy pages nr
      required: false,
    },
  },
  computed: {},
  methods: {
    uploadPage() {
      console.log('TODO upload page function')
    },
  },
}
</script>

<style lang="scss" scoped>
.upload-page {
  width: 140px;
  height: 198px;
}
</style>
