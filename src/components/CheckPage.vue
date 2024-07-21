<!-- <template>
  <div>
    <h1>检查页面</h1>
    <div>
      <img :src="imagePath" alt="题目图片" />
      <h2>{{ title }}</h2>
      <p>{{ answer }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {

  },
  props: {
    title: String,
    answer: String,
    imagePath: String
  }
};
</script> -->





<!-- <template>
  <div>
    <h1>检查页面</h1>
    <div>
      <img :src="decodeURIComponent(imagePath)" alt="题目图片" /> 
      <h2>{{ decodeURIComponent(title) }}</h2>
      <p>{{ decodeURIComponent(answer) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  props: [
    'title',
    'answer',
    'imagePath'
]
};
</script> -->



<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ answer }}</p>
    <img v-if="imagePath" :src="imagePath" alt="题目图片">
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    imagePath: {
      type: String,
      default: ''
    }
  }
};
</script>
