import Layout from "@/layout/index.vue";
import { RouteConfig } from "vue-router";

export const playerRouter: RouteConfig = {
  path: "/players",
  component: Layout,
  meta: {
    title: "playerMgt", //i18n国际化
    icon: "player"
  },
  children: [
    {
      path: "list",
      component: () => import("@/views/player/list.vue"),
      meta: {
        title: "playerList",
        icon: "list"
      }
    },
    {
      path: "create",
      component: () => import("@/views/player/create.vue"),
      meta: {
        title: "createPlayer",
        icon: "edit"
      }
    },
    {
      path: "edit/:id(\\d+)",
      component: () => import("@/views/player/edit.vue"),
      meta: {
        title: "editPlayer",
        noCache: true,
        activeMenu: "/players/list",
        hidden: true
      }
    }
  ]
};
