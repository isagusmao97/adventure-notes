<script setup lang="ts">
import { ref } from "vue";

const textoEsquerda = ref("");
const textoDireita = ref("");
</script>

<template>
  <div class="flex flex-col items-center gap-6 p-8">
    <div class="relative max-w-4xl w-full">
      <img
        src="/src/assets/bloco-de-notas.png"
        alt="Bloco de notas do Adventure Notes"
        class="w-full h-auto"
      />

      <textarea
        v-model="textoEsquerda"
        placeholder="Era uma vez uma nota..."
        class="absolute top-[16%] left-[14%] w-[32%] h-[60%] bg-transparent resize-none border-none outline-none overflow-y-auto font-mono text-sm leading-relaxed text-slate-950"
      ></textarea>

      <textarea
        v-model="textoDireita"
        placeholder=""
        class="absolute top-[16%] right-[14%] w-[32%] h-[60%] bg-transparent resize-none border-none outline-none overflow-y-auto font-mono text-sm leading-relaxed text-slate-950"
      ></textarea>
    </div>
  </div>
</template>
