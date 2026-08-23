<script setup lang="ts">
import { ref } from "vue";

const textoEsquerda = ref("");
const textoDireita = ref("");
const fontes = [
  { label: "Libre Baskerville", classe: "font-baskerville" },
  { label: "Space Mono", classe: "font-spacemono" },
  { label: "Cutive Mono", classe: "font-cutivemono" },
  { label: "Noto Serif", classe: "font-notoserif" },
  { label: "Roboto", classe: "font-roboto" },
];
const fonteSelecionada = ref(fontes[0].classe);
const cores = [
  { label: "Slate", classe: "text-slate-700" },
  { label: "Neutral", classe: "text-neutral-700" },
  { label: "Amber", classe: "text-amber-700" },
  { label: "Teal", classe: "text-teal-700" },
  { label: "Blue", classe: "text-blue-700" },
  { label: "Violet", classe: "text-violet-700" },
  { label: "Pink", classe: "text-pink-700" },
];
const corSelecionada = ref(cores[0].classe);
</script>

<template>
  <div class="flex flex-col items-center gap-6 p-8">
    <div class="flex gap-4">
      <select
        v-model="fonteSelecionada"
        class="font-mono text-sm border rounded p-1"
      >
        <option disabled value="">Fontes</option>
        <option
          v-for="fonte in fontes"
          :key="fonte.classe"
          :value="fonte.classe"
        >
          {{ fonte.label }}
        </option>
      </select>

      <select
        v-model="corSelecionada"
        class="font-mono text-sm border rounded p-1"
      >
        <option disabled value="">Cores</option>
        <option v-for="cor in cores" :key="cor.classe" :value="cor.classe">
          {{ cor.label }}
        </option>
      </select>
    </div>

    <div class="relative max-w-4xl w-full">
      <img
        src="/src/assets/bloco-de-notas.png"
        alt="Bloco de notas do Adventure Notes"
        class="w-full h-auto"
      />

      <textarea
        v-model="textoEsquerda"
        placeholder="Era uma vez uma nota..."
        :class="[
          'absolute top-[16%] left-[14%] w-[32%] h-[60%] bg-transparent resize-none border-none outline-none overflow-y-auto text-sm leading-relaxed',
          fonteSelecionada,
          corSelecionada,
        ]"
      ></textarea>

      <textarea
        v-model="textoDireita"
        placeholder=""
        :class="[
          'absolute top-[16%] right-[14%] w-[32%] h-[60%] bg-transparent resize-none border-none outline-none overflow-y-auto text-sm leading-relaxed',
          fonteSelecionada,
          corSelecionada,
        ]"
      ></textarea>
    </div>
  </div>
</template>
