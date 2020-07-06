<template>
  <Layout :title="`${$t('edit')} ${$tc('hive', 1)}`">
    <v-container v-if="activeHive">
      <v-row>
        <v-col class="d-flex justify-end">
          <v-btn color="red" dark type="submit" @click="deleteHive">{{
            $t('Delete')
          }}</v-btn>
        </v-col>
      </v-row>

      <v-form ref="form">
        <!-- <div class="header d-flex justify-space-between">
        <div>
          <h2 v-text="activeHive.name"></h2>
        </div>
      </div> -->

        <v-card outlined>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <v-text-field v-model="hiveName" :label="`${$t('Name')}*`">
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-btn
                  class="color-button"
                  :color="hiveColor"
                  @click="overlay = !overlay"
                  >{{ $t('color') }}</v-btn
                >
              </v-col>

              <v-overlay :value="overlay">
                <v-btn icon class="align-right" @click="overlay = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-color-picker v-model="hiveColor" hide-canvas light>
                </v-color-picker>
              </v-overlay>

              <!-- <v-col class="d-flex" cols="12" sm="6" md="4">
                <v-select
                  v-model="hiveLocation"
                  :items="apiaryNames"
                  :label="`${$tc('Location', 1)}*`"
                ></v-select>
              </v-col> -->

              <v-col cols="12" sm="6" md="3">
                <v-select
                  v-if="activeHive && hiveType"
                  v-model="hiveType"
                  :items="hiveTypes"
                  item-text="name"
                  item-value="name"
                  :label="`${$t('Type', 1)}*`"
                >
                </v-select>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  v-model="hiveFrames"
                  :label="`${$t('Hive_frames')}*`"
                >
                </v-text-field>
              </v-col>
            </v-row>

            <HiveFactory
              v-if="activeHive && activeHive.layers"
              :hive="activeHive"
            ></HiveFactory>
          </v-card-text>
          <v-card-actions>
            <v-col class="mt-2 d-flex justify-end">
              <v-btn
                color="primary"
                dark
                type="submit"
                @click="saveHiveSettings"
                >{{ $t('save_and_return') }}</v-btn
              >
            </v-col>
          </v-card-actions>
        </v-card>
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
import HiveFactory from '@components/hive-factory.vue'
import { mapGetters } from 'vuex'
import Layout from '@layouts/back.vue'

export default {
  components: {
    HiveFactory,
    Layout,
  },
  data: function() {
    return {
      snackbar: {
        show: false,
        timeout: 2000,
        text: 'notification',
      },
      overlay: false,
      //   normalizer(node) {
      //   return {
      //     id: node.key,
      //     label: node.name,
      //     children: node.subOptions,
      //   }
      // },
    }
  },
  computed: {
    // ...mapGetters('hives', ['hives']),
    // ...mapGetters('locations', ['apiaries']),
    ...mapGetters('hives', ['activeHive']),
    ...mapGetters('taxonomy', ['hiveTypes']),
    // hive() {
    //   return this.activeHive
    // },
    locale() {
      return this.$i18n.locale
    },
    hiveName: {
      get() {
        if (this.activeHive) {
          return this.activeHive.name // $store.state.hives.hive.name
        } else {
          return ''
        }
      },
      set(value) {
        this.$store.commit('hives/updateHiveName', value)
      },
    },
    hiveColor: {
      get() {
        if (this.activeHive) {
          return this.activeHive.color // $store.state.hives.hive.name
        } else {
          return ''
        }
      },
      set(value) {
        this.$store.commit('hives/updateHiveColor', value)
      },
    },
    hiveFrames: {
      get() {
        if (this.activeHive.layers) {
          return this.activeHive.layers[0].framecount // $store.state.hives.hive.name
        } else {
          return ''
        }
      },
      set(value) {
        this.$store.commit('hives/updateHiveFrames', parseInt(value))
      },
    },
    hiveType: {
      get() {
        if (this.activeHive) {
          return this.activeHive.type // $store.state.hives.hive.name
        } else {
          return ''
        }
      },
      set(value) {
        this.$store.commit('hives/updateHiveType', value)
      },
    },
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
    nestedHiveTypes() {
      // const languages = Object.keys(this.hiveTypes[0].group) // can't assume the first item has all translations
      var allLanguages = []
      this.hiveTypes.map((hiveType) =>
        allLanguages.push(...Object.keys(hiveType.group))
      )
      const languages = allLanguages.filter((v, i, a) => a.indexOf(v) === i)
      var nestedHiveTypes = {}
      languages.map((language) => {
        var result = this.hiveTypes.reduce(function(r, a) {
          r[a.group[language]] = r[a.group[language]] || []
          r[a.group[language]].push(a)
          return r
        }, {})
        nestedHiveTypes[language] = result
      })
      return nestedHiveTypes
      // TODO: make into format suitable for vue-treeselect (id/label/children)
    },

    // hive() {
    //   return this.hives.find((hive) => hive.id === this.id)
    // },
    // apiaryNames() {
    //   return (
    //     (this.apiaries &&
    //       this.apiaries.reduce((names, apiary) => {
    //         names.push(apiary.name)
    //         return names
    //       }, [])) ||
    //     []
    //   )
    // },
  },
  created() {
    // this.$store.dispatch('hives/findAll') // in case of direct link / page reload
    this.$store.dispatch('hives/findById', this.id)
    // .then((data) => console.log('created:' + data))
    this.$store.dispatch('taxonomy/index')
    // this.$store.dispatch('locations/findAll') // evt via props?
  },
  methods: {
    saveHiveSettings() {
      this.$store
        .dispatch('hives/saveHiveSettings', this.activeHive) // this.activeHive
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
        .dispatch('hives/deleteHive', this.activeHive.id) // this.activeHive
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
.color-button {
  color: $color-white;
}
</style>
