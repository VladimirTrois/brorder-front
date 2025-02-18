<template>
  <div class="grid">
    <h1>Allergies et Informations</h1>
    <div class="tableContainer">
      <table class="table">
        <thead>
          <tr>
            <th>Allergies:</th>
            <th>Baguette</th>
            <th>Tradition</th>
            <th>Céréales</th>
            <th>Croissant</th>
            <th>Pain au chocolat</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gluten</td>
            <td class="true">Oui/Yes</td>
            <td class="true">Oui/Yes</td>
            <td class="true">Oui/Yes</td>
            <td class="true">Oui/Yes</td>
            <td class="true">Oui/Yes</td>
          </tr>
          <tr>
            <td>Oeufs/Eggs</td>
            <td class="no">Non/no</td>
            <td class="no">Non/no</td>
            <td class="maybe">Traces Possibles/May Contain</td>
            <td class="true">Oui/Yes</td>
            <td class="true">Oui/Yes</td>
          </tr>
          <tr>
            <td>Lait/Milk</td>
            <td class="maybe">Traces Possibles/May Contain</td>
            <td class="no">Non/no</td>
            <td class="no">Non/no</td>
            <td class="true">Oui/Yes</td>
            <td class="true">Oui/Yes</td>
          </tr>
          <tr>
            <td>Soja</td>
            <td class="no">Non/no</td>
            <td class="no">Non/no</td>
            <td class="maybe">Traces Possibles/May Contain</td>
            <td class="no">Non/no</td>
            <td class="true">Oui/Yes</td>
          </tr>
          <tr>
            <td>Graines de sésame</td>
            <td class="maybe">Traces Possibles/May Contain</td>
            <td class="maybe">Traces Possibles/May Contain</td>
            <td class="true">Oui/Yes</td>
            <td class="no">Non/no</td>
            <td class="no">Non/no</td>
          </tr>
          <tr>
            <td>Poids</td>
            <td>280g</td>
            <td>280g</td>
            <td>250g</td>
            <td>70g</td>
            <td>80g</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.tableContainer {
  @apply relative flex flex-col w-full h-full overflow-auto md:overflow-visible text-sm md:text-base rounded-lg border-2;
  &:hover {
    @apply border-dark_accent;
  }
}
table {
  @apply table-auto min-w-max overflow-scroll rounded;
}

.true {
  @apply bg-red-600;
}
.no {
  @apply bg-green-700;
}
.maybe {
  @apply bg-orange-400;
}
</style>