import { createApp, h, provide } from "vue";
import "./main.scss";
import "vuetify/styles/main.css";
import "virtual:uno.css";
import App from "./App.vue";
import { router } from "./plugins/router";
import { pinia } from "./plugins/pinia";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "./plugins/apollo";
import { vuetify } from "./plugins/vuetify";

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(router);
app.use(pinia);
app.use(vuetify);

app.mount("#app");
