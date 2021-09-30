<script setup lang="ts">
import { inject } from "vue";
import { CreateNotification } from "./notifications";

const createNotification = <CreateNotification>inject("create-notification");
</script>

<template>
  <div class="page-content">
    <h2>Home Page</h2>
    <div class="btn-group">
      <button
        @click.prevent="createNotification({ message: 'Info Home Page' })"
      >
        Info
      </button>
      <button
        @click.prevent="
          createNotification({
            type: 'error',
            message: 'Error Notification from Home Page',
            duration: 10,
          })
        "
      >
        Error
      </button>
      <button
        @click.prevent="
          createNotification({
            type: 'warning',
            message: 'Warning Notification from Home Page',
          })
        "
      >
        Warning
      </button>
      <button
        @click.prevent="
          createNotification({
            type: 'success',
            message: 'Success Notification from Home Page',
          })
        "
      >
        Success
      </button>
      <button
        @click.prevent="
          createNotification({
            message: 'Persistant Notification Home Page',
            autoClose: false,
          })
        "
      >
        Persistant Info
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
