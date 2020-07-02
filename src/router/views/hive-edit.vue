<template>
  <Layout :title="`${$t('edit')} ${$tc('hive', 1)}`">
    <v-container v-if="hive">
      <div class="header d-flex justify-space-between">
        <div>
          <h2 v-text="hive.name"></h2>
          <h3 v-text="`${$t('Hive_settings')}`"></h3>
        </div>

        <v-btn color="red" dark type="submit" @click="deleteHive">{{
          $t('Delete')
        }}</v-btn>
      </div>

      <HiveIcon :hive="hive"></HiveIcon>

      <v-form ref="form">
        <v-card outlined>
          <v-card-text>
            <div
              class="overline title"
              v-text="`${$tc('hive', 1)} ${$t('details')}`"
            ></div>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="hive.name" :label="`${$t('Name')}*`">
                </v-text-field>
              </v-col>

              <!-- <v-col class="d-flex" cols="12" sm="6" md="4">
                <v-select
                  v-model="hive.location"
                  :items="apiaryNames"
                  :label="`${$tc('Location', 1)}*`"
                ></v-select>
              </v-col> -->

              <v-col cols="12" sm="6" md="4">
                <v-text-field :label="`${$t('Type')}*`">
                  Type
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <div class="mt-2 float-right">
          <v-btn color="primary" dark type="submit" @click="saveHiveSettings">{{
            $t('save_and_return')
          }}</v-btn>
        </div>
      </v-form>
    </v-container>

    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout">
      {{ snackbar.text }}
      <v-btn color="blue" text @click="snackbar.show = false">
        {{ $t('Close') }}
      </v-btn>
    </v-snackbar>
  </Layout>
</template>

<script>
import HiveIcon from '@components/hive-icon.vue'
import { mapGetters } from 'vuex'
import Layout from '@layouts/back.vue'

export default {
  components: {
    HiveIcon,
    Layout,
  },
  data: function() {
    return {
      snackbar: {
        show: false,
        timeout: 2000,
        text: 'notification',
      },
    }
  },
  computed: {
    ...mapGetters('hives', ['hives']),
    ...mapGetters('locations', ['apiaries']),
    // ...mapGetters('hives', ['activeHive']),
    // hive() {
    //   return this.activeHive
    // },
    // hiveName: {
    //   get() {
    //     if (this.activeHive) {
    //       return this.activeHive.name // $store.state.hives.hive.name
    //     } else {
    //       return ''
    //     }
    //   },
    //   set(value) {
    //     this.$store.commit('hives/updateHiveName', value)
    //   },
    // },
    // hiveLocation: {
    //   get() {
    //     if (this.activeHive) {
    //       return this.activeHive.location // $store.state.hives.hive.location
    //     } else {
    //       return ''
    //     }
    //   },
    //   set(value) {
    //     this.$store.commit('hives/updateHiveLocation', value)
    //   },
    // },
    id() {
      return parseInt(this.$route.params.id)
    },
    hive() {
      return this.hives.find((hive) => hive.id === this.id)
    },
    apiaryNames() {
      return (
        (this.apiaries &&
          this.apiaries.reduce((names, apiary) => {
            names.push(apiary.name)
            return names
          }, [])) ||
        []
      )
    },
  },
  created() {
    this.$store.dispatch('hives/findAll') // in case of direct link / page reload
    // this.$store
    //   .dispatch('hives/findById', this.id)
    //   .then((data) => console.log('created:' + data))
    this.$store.dispatch('locations/findAll') // evt via props?
  },
  methods: {
    saveHiveSettings() {
      this.$store
        .dispatch('hives/saveHiveSettings', this.hive) // this.activeHive
        .then(() =>
          this.$router.push({
            name: 'home',
          })
        )
        .catch((error) => {
          console.log(error)
        })
    },
    deleteHive() {
      this.$store
        .dispatch('hives/deleteHive', this.hive.id) // this.activeHive
        .then(() =>
          this.$router.push({
            name: 'home',
          })
        )
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  margin: 16px 0 24px;
}
</style>
