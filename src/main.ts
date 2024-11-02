import { createApp, h, provide } from "vue";
import "virtual:uno.css";
import App from "./App.vue";
import { router } from "./plugins/router";
import { pinia } from "./plugins/pinia";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "./plugins/apollo";

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(router);
app.use(pinia);

app.mount("#app");
