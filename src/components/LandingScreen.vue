<template>
    <v-main app>
      <v-container class="landing-screen px-0 py-0" fluid>
        <div class="overlay">

          <v-container class="py-10">

            <v-row>
              <v-col>

                <h1 class="text-h2 white--text">Données régionales</h1>
                <h2 class="text-h4 white--text">Production et consommation d'électricité</h2>

              </v-col>
            </v-row>

            <div class="mt-5 mt-md-15">
              <h3 class="text-h5 white--text">Soumettez le formulaire ci dessous pour démarrer</h3>
            </div>

            <v-row>

              <v-col cols="12" sm="4">
                <v-select
                    :items="years"
                    v-model="yearInput"
                    label="Choisir une année"
                    solo
                ></v-select>
              </v-col>

              <v-col cols="12" sm="4">
                <v-select
                    :items="regions"
                    v-model="regionInput"
                    label="Choisir une région"
                    solo
                ></v-select>
              </v-col>

              <v-col cols="12" sm="4">
                <v-btn
                    color="primary"
                    depressed
                    large
                    @click="$router.push({name: 'dashboard', query: { year: yearInput.toString(), region: regionInput } })"
                >valider
                </v-btn>
              </v-col>

            </v-row>

          </v-container>

        </div>
      </v-container>
    </v-main>
</template>

<script>
export default {
  name: "LandingScreen",
  props: {
    onClick: Function,
    years: Array,
    regions: Array,
  },
  data() {
    return {
      regionInput: '',
      yearInput: 0,
    }
  }
}
</script>

<style scoped>
.landing-screen {
  height: 100vh;
  width: 100%;
  background-image: url('~@/assets/solar.jpg');
  background-size: cover;
  position: absolute;
}

.overlay {
  background: linear-gradient(180deg, rgba(89, 89, 89, 1) 0%, rgba(32, 32, 32, 0.65) 0%, rgba(172, 172, 172, 0.2) 100%);
  height: 100%;
}
</style>
