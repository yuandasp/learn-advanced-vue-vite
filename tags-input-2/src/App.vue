<!-- script adalah tempat untuk code javascript, data, dll
 <script setup> digunakan untuk single file component -->
<script>
// 1. misalnya secara local, TagsInput hanya akan digunakan di App.vue, maka:
// import TagsInput from "./components/TagsInput.vue";
// export default { components: { TagsInput } };
// 1. sampai sini

export default {
  data: () => ({
    jsFrameworks: ["ReactJS", "VueJS", "Angular"],
    otherFrameworks: [],
  }),
  methods: {
    handleChange(tags) {
      this.jsFrameworks = [...tags];
    },
  },
};
</script>

<!-- template adalah tempat untuk struktur HTML dan component yang akan dibuat -->
<template>
  <h1>Hello world</h1>
  <!-- <p>{{ jsFrameworks }}</p>
  <p>{{ otherFrameworks }}</p> -->

  <!-- ini adalah cara memanggil komponen local-->
  <!-- <tags-input></tags-input> ini gak perlu karna sebenernya sama aja kaya yang kedua -->
  <tags-input :selected-tags="jsFrameworks" @change="handleChange" />
  <tags-input
    :selected-tags="otherFrameworks"
    @change="otherFrameworks = [...$event]"
  />
  <!-- <TagsInput /> hanya berlaku untuk lokal komponen atau komponen global apabila syntax-nya sesuai -->
  <!-- sampai sini -->
</template>

<!-- style/CSS -->
<!-- Jika kita ingin menerapkan style pada template tertentu saja dan tidak memengaruhi komponen yang lain,
 maka ditentukan dengan scoped <style scoped> -->

<style scoped>
h1 {
  color: blue;
}
</style>
