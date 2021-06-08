<template>
  <q-layout view="hHr LpR lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="arrow_back"
          @click="$router.back()"
        />

        <q-toolbar-title v-text="$store.getters.getPageHeader" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
