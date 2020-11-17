<template>
  <div class="p-col-12">
    <div class="game-list-item">
      <div>
        <img :src="gameData.thumb_url" :alt="gameData.name" />
      </div>
      <div class="game-info">
        <h3>{{ gameData.name }}</h3>
        <div class="game-details">
          <p>
            Number of players:
            <strong
              >{{ gameData.min_players }} - {{ gameData.max_players }}
            </strong>
          </p>
          <p>
            Time:
            <strong
              >{{ gameData.min_playtime }} -
              {{ gameData.max_playtime }} mins</strong
            >
          </p>
          <p>
            Age: <strong>{{ gameData.min_age }}+</strong>
          </p>
        </div>
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "listItem",
  props: ["gameData"],
};
</script>
<style scoped>
p {
  font-weight: 300;
}
strong {
  font-weight: 400;
}
.game-list-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  width: 100%;
  background-color: var(--very-light-grey);
  border: solid rgba(var(--dark-highlight), 0.2);
}
.game-info {
  flex: 1 1 0;
}
img {
  height: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin: 0 2rem;
  max-height: 5rem;
}
h3 {
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
}
.game-details {
  display: flex;
  flex-direction: row;
}
.game-details p {
  margin-right: 1rem;
}
@media screen and (max-width: 650px) {
  .game-list-item {
    flex-direction: column;
    align-items: center;
  }
  .game-list-detail {
    text-align: center;
  }
}
</style>