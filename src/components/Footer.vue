<template>
  <v-card>
    <v-card-title>
      Données utlisées
    </v-card-title>
    <v-card-subtitle>
      Portail Open Data - Réseaux énergies
    </v-card-subtitle>
    <v-card-text>
      <v-list>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>
              mdi-link
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <a href="https://opendata.reseaux-energies.fr/explore/dataset/prod-region-annuelle-filiere/information/?disjunctive.region">
              Production régionale par filière
            </a>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>
              mdi-link
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <a href="https://opendata.reseaux-energies.fr/explore/dataset/conso-nette-regionale/information/?disjunctive.region">
              Consommation régionale d'électricité
            </a>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>
              mdi-link
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <a href="https://opendata.reseaux-energies.fr/explore/dataset/eco2mix-national-cons-def/information/?disjunctive.nature">
              Données éCO2mix nationales
            </a>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>

</style>
