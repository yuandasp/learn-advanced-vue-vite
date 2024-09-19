// untuk meregistrasikan komponen secara global, ditaro di sini
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import TagsInput from "./components/TagsInput.vue";

// syntax sebelum diubah adalah seperti ini --> createApp(App).mount("#app"); <--
const app = createApp(App);
app.component("tags-input", TagsInput); //pada saat membuat komponen global, maka komponen ketika dipanggil harus sesuai syntax-nya
app.mount("#app");
