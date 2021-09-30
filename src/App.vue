<script setup lang="ts">
import { provide } from "vue";
import useNotifications from "./notifications";
import ToastNotification from "./components/ToastNotification.vue";

const {
  notifications,
  createNotification,
  removeNotifications,
  stopBodyOverflow,
  allowBodyOverflow,
} = useNotifications();

provide("create-notification", createNotification);
</script>

<template>
  <div class="main">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/contact">Contact</router-link>
    </nav>
    <div class="btn-group">
      <button
        @click.prevent="
          () => {
            createNotification({
              message: 'This is a notification from the App.vue Component',
            });
          }
        "
      >
        Notification From App Component
      </button>
    </div>
    <div class="router-view">
      <router-view></router-view>
    </div>
    <transition-group
      name="toast-notification"
      tag="div"
      class="toast-notifications"
      @before-enter="stopBodyOverflow"
      @after-enter="allowBodyOverflow"
      @before-leave="stopBodyOverflow"
      @after-leave="allowBodyOverflow"
    >
      <toast-notification
        v-for="(item, idx) in notifications"
        :key="item.id"
        :id="item.id"
        :type="item.type"
        :title="item.title"
        :message="item.message"
        :auto-close="item.autoClose"
        :duration="item.duration"
        @close="
          () => {
            removeNotifications(item.id);
          }
        "
      ></toast-notification>
    </transition-group>
  </div>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  transition: all 0.3s ease-in-out;
}
body {
  height: 100vh;
  width: 100vw;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  &.hide-overflow {
    overflow: hidden;
  }
}

button {
  text-transform: uppercase;
  padding-inline: 0.6rem;
  padding-block: 1rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid gainsboro;

  &:hover,
  &:focus {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.08),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  }
}

.btn-group {
  display: flex;
  gap: 1rem;
}

.page-content {
  margin-block: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-inline: 2rem;
  nav {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    height: 4rem;

    a {
      padding: 0.5rem;
      &:hover {
        background: whitesmoke;
      }
    }
  }

  .router-view {
    border-block-start: 2px solid whitesmoke;
  }

  .toast-notifications {
    z-index: 100;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: flex;
    flex-direction: column-reverse;
    gap: 0.8rem;
  }

  .toast-notification-enter-active {
    animation: toast-fade-in 0.5s ease-in-out;
  }
  .toast-notification-leave-active {
    animation: toast-fade-in 0.5s ease-in-out reverse;
  }

  @keyframes toast-fade-in {
    from {
      opacity: 0;
      transform: scale(0.4);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
}
</style>
