<!-- agar komponen ini bisa diakses di komponen lain, kita perlu meregistrasi dgn cara local/global -->
<template>
  <!-- interpolation -->
  <!-- <div>{{ tags }}</div>
  <div>{{ tags.length }}</div>
  <div>{{ tags[0].toUpperCase() }}</div> -->
  <!-- sampai sini -->

  <!-- bisa juga pemanggilan data dengan cara directive "v-..." 
   v-text digunakan seperti interpolation
   v-for digunakan untuk looping array
   v-bind digunakan untuk mengatur nilai secara dinamis-->
  <!-- <div v-text="tags"></div> -->
  <!-- <div v-if="!tags.length">You have no any tags!</div> -->
  <!-- selalu tambahkan attribute :key ketika v-for -->
  <!-- <div v-for="(tag, index) in tags" :key="index">
    {{ tag }} <a href="#" @click.prevent="removeTag(index)">&times;</a>
  </div> -->

  <!-- <input type="text" v-bind:value="newTag" /> 
   shortcut-nya yang di bawah ini ya,
   dan untuk v-on.(blablabla) shortcutnya adalah @(blablabla)-->
  <!-- <hr /> -->
  <!-- <pre>{{ newTag }}</pre> kalau misalnya di input belum ada @input, maka pre akan mengikuti newTag yang current datanya
   jadi tidak mengikuti :value -->
  <!-- <pre>{{ newTag }}</pre> -->
  <!-- input di bawah ini adalah termasuk two-way data binding, perubahan terjadi 2 arah.
   tapi proses ini bisa disederhanakan dalam v-model 
   :value="newTag"
   @input="newTag = $event.target.value"
   v-on:keydown.enter="tags.push($event.target.value)"
   -->
  <!-- v-model ini bisa mempunyai modifier atau pengubah aturan dari directive.
   contoh modifier-nya di sini adalah "trim" yang berfungsi untuk menghilangkan spasi -->
  <!--  lalu ada pembuatan method, di mana fungsi ini dibuat apabila ada logic yang rumit
   v-on:keydown.enter="tags.push(newTag)"
   @keydown.tab.prevent="tags.push(newTag)"
   
   :style="tags.includes(newTag) ? {color: "red", "text-decoration":"line-through"} : ''"
   :class="tags.includes(newTag) ? 'tag-exists' : ''"
   -->
  <!-- <button v-on:click="tags.push(newTag)">Ok</button> -->
  <!-- <input
     type="text"
     v-model.trim="newTag"
     v-on:keydown.enter="addNewTag"
     @keydown.tab.prevent="addNewTag"
     @keydown.delete="removeLastTag"
     :class="{ 'tag-exists': isTagExist }"
   /> -->
  <!--  -->

  <div class="tags-input-wrapper">
    <span class="tag-item" v-if="!tags.length">You have no any tags!</span>
    <span class="tag-item" v-for="(tag, index) in tags" :key="index">
      {{ tag }}
      <a class="remove-tag" href="#" @click.prevent="removeTag(index)"
        >&times;</a
      >
    </span>
    <input
      class="tag-input"
      type="text"
      v-model.trim="newTag"
      v-on:keydown.enter="addNewTag"
      @keydown.tab.prevent="addNewTag"
      @keydown.delete="removeLastTag"
      :class="{ 'tag-exists': isTagExist }"
    />
  </div>
</template>

<script>
export default {
  props: { selectedTags: { type: Array, default: () => [] } },

  // penggunaan arrow function ketika tidak ada this.
  // data: () => ({
  //   //   tags: [],
  //   // tags: ["Vue", "React", "Angular"],
  //   // newTag: "NextJS",
  // }),
  data() {
    return {
      tags: [...this.selectedTags],
      newTag: "",
    };
  },

  // apabila ada logic yang sama, jgn dry=don't repeat yourself
  // computed tidak memiliki argumen
  computed: {
    isTagExist() {
      return this.tags.includes(this.newTag);
    },
  },

  //apabila ingin mengawasi suatu properti
  watch: {
    newTag(newVal) {
      if (newVal.indexOf(",") > -1) {
        this.newTag = newVal.slice(0, -1);
        this.addNewTag();
      }
    },
  },
  methods: {
    addNewTag() {
      if (this.newTag && !this.isTagExist) {
        this.tags.push(this.newTag);
        this.newTag = "";
        this.$emit("change", this.tags);
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1);
      this.$emit("change", this.tags);
    },
    removeLastTag() {
      if (this.newTag.length === 0) {
        this.removeTag(this.tags.length - 1);
      }
    },
  },
  emits: ["change"],
};
</script>

<style scoped>
.tag-input.tag-exists {
  color: red;
  text-decoration: line-through;
}
.tags-input-wrapper {
  background: #fff;
  padding: 0.5em;
  border: 1px solid #dbdbdb;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  min-height: 36px;
  box-sizing: border-box;
}

.tag-item {
  color: #f5f9fc;
  background-color: #191967;
  margin-right: 0.3em;
  padding: 0.25em 0.4em;
  font-size: 80%;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 1.25em;
  padding-left: 0.6em;
  border-radius: 4px;
}

.tag-input {
  color: #495057;
  flex: 1;
  background: transparent;
  border: none;
}

.tag-input:focus {
  outline: none;
}
a.remove-tag {
  text-decoration: none;
}
</style>
