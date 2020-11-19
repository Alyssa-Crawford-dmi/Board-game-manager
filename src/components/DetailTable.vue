<template>
  <table>
    <tr>
      <td class="first-col">Average user rating:</td>
      <td>{{ gameData.average_user_rating.toFixed(1) }} stars</td>
    </tr>
    <tr>
      <td>Number of user ratings:</td>
      <td>{{ gameData.num_user_ratings }}</td>
    </tr>
    <tr>
      <td>MSRP:</td>
      <td>${{ gameData.msrp }}</td>
    </tr>

    <tr>
      <td>Primary publisher</td>
      <td>
        {{ gameData.primary_publisher ? gameData.primary_publisher.name : "" }}
      </td>
    </tr>
    <tr>
      <td>Year published</td>
      <td>{{ gameData.year_published }}</td>
    </tr>
    <tr>
      <td>Primary designer:</td>
      <td>
        {{ gameData.primary_designer ? gameData.primary_designer.name : "" }}
      </td>
    </tr>
    <tr>
      <td>Artists:</td>
      <td>{{ gameData.artists.join(", ") }}</td>
    </tr>
    <tr>
      <td>Offical url:</td>
      <td>
        <a :href="gameData.official_url">{{ gameData.official_url }}</a>
      </td>
    </tr>
    <tr>
      <td>Rules:</td>
      <td>
        <a :href="gameData.rules_url">{{ gameData.rules_url }}</a>
      </td>
    </tr>
  </table>
</template>
<script>
export default {
  name: "detailTable",
  props: { gameData: { type: Object, required: true } },
};
</script>
<style scoped>
table {
  width: 100%;
}
td {
  border-bottom: 1px solid #ddd;
  padding: 0.5rem 1rem;
}
tr:hover {
  background-color: #f5f5f5;
}
.first-col {
  width: 25%;
}
a {
  text-decoration: none;
}
</style>