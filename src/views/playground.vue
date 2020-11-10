<template>
  <div>
    <ion-item button @click="testClick()">
      <ion-avatar v-slot="start">
        <img
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw=="
        />
      </ion-avatar>
      <ion-label> Avatar Start, Button Item </ion-label>
    </ion-item>

    <ion-item href="#">
      <ion-label> Thumbnail End, Anchor Item </ion-label>
      <ion-thumbnail v-slot="end">
        <img
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw=="
        />
      </ion-thumbnail>
    </ion-item>

    <ion-item>
      <ion-thumbnail v-slot="start">
        <img
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw=="
        />
      </ion-thumbnail>
      <ion-label>
        <h2>H2 Title Text</h2>
        <p>Button on right</p>
      </ion-label>
      <ion-button fill="outline" v-slot="end">View</ion-button>
    </ion-item>

    <ion-item button @click="testClick()">
      <ion-thumbnail v-slot="start">
        <img
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw=="
        />
      </ion-thumbnail>
      <ion-label>
        <h3>H3 Title Text</h3>
        <p>Icon on right</p>
      </ion-label>
      <ion-icon :icon="closeCircle" v-slot="end"></ion-icon>
    </ion-item>
  </div>
</template>

<script>
import {
  // IonList,
  IonItem,
  IonLabel,
  //   IonText,
  IonAvatar,
  IonThumbnail,
  IonButton,
  IonIcon,
} from "@ionic/vue";
export default {
  components: {
    // IonList,
    IonItem,
    IonLabel,
    // IonText,
    IonAvatar,
    IonThumbnail,
    IonButton,
    IonIcon,
  },
};
</script>