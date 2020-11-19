<template>
  <PreviewText :text="longText" />
</template>
<script>
import PreviewText from "../components/PreviewText";
export default {
  components: {
    PreviewText,
  },
  data() {
    return {
      longText: `Brown skin girl
Your skin just like pearls
The best thing in the world
Never trade you for anybody else
Singin' brown skin girl
Your skin just like pearls
The best thing in the world
I never trade you for anybody else, singin'
She said she really grew up poor like me
yeah
So while I may not pretty boy, your heart is amiss
Play it like a villain 'cause she caught in a wave
Tonight I am walkin' away`,
    };
  },
};
</script>