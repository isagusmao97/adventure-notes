<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
    <h1 class="text-3xl font-baskerville">Adventure Notes</h1>
    <p class="max-w-xl text-center font-mono">
      O Adventure Notes é um bloco de notas inspirado em RPG de Fantasia...
    </p>
    <router-link
      to="/notas"
      class="font-mono bg-amber-800 text-amber-50 px-4 py-2 rounded"
    >
      Começar a escrever
    </router-link>
  </div>
</template>