<script setup lang="ts">
</script>

<template>
  <section
  class="relative w-full bg-cover h-screen bg-center flex flex-col items-center justify-center"
  style="background-image: url('/src/assets/banner.png')"
>
  <div class="absolute inset-0 bg-black/40"></div>

  <div class="relative z-10 flex flex-col items-center gap-4">
    <h1 class="text-7xl font-baskerville text-amber-50">Adventure Notes</h1>
    <p class="text-lg font-mono text-amber-100 max-w-xl text-center">
      Um bloco de notas inspirado em RPG de Fantasia
    </p>
    <router-link
      to="/notas"
      class="font-mono bg-teal-900 text-amber-50 px-4 py-2 rounded"
    >
      Comece uma Aventura
    </router-link>
  </div>
  <div class="relative z-10 text-lg font-mono text-white text-center p-10">
    <p>Adventure Notes é um bloco de notas web inspirado em RPG de Fantasia. <br> A interface simula um livro/grimório aberto, onde o usuário escreve suas notas diretamente <br> sobre as páginas ilustradas.</p>
    <p>O Adventure Notes foi desenvolvido com uso do Vue 3, Vite e Tailwind CSS v4.3</p>
</div>
</section>

</template>