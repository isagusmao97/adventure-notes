<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import marcador from "/src/assets/marcador.png";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";

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
const notas = ref([
  { titulo: "Nota 1", textoEsquerda: "", textoDireita: "" },
  { titulo: "Nota 2", textoEsquerda: "", textoDireita: "" },
]);
const notaAtivaIndex = ref(0);
const notaAtiva = computed(() => notas.value[notaAtivaIndex.value]);

const CHAVE_STORAGE = "adventure-notes-dados";

// Carrega os dados salvos assim que o componente monta
onMounted(() => {
  const salvo = localStorage.getItem(CHAVE_STORAGE);
  if (salvo) {
    try {
      const dados = JSON.parse(salvo);
      notas.value = dados.notas ?? notas.value;
      notaAtivaIndex.value = dados.notaAtivaIndex ?? 0;
      fonteSelecionada.value = dados.fonteSelecionada ?? fonteSelecionada.value;
      corSelecionada.value = dados.corSelecionada ?? corSelecionada.value;
    } catch (e) {
      console.error("Erro ao carregar dados salvos:", e);
    }
  }
});

// Salva automaticamente sempre que algo relevante mudar
watch(
  [notas, notaAtivaIndex, fonteSelecionada, corSelecionada],
  () => {
    localStorage.setItem(
      CHAVE_STORAGE,
      JSON.stringify({
        notas: notas.value,
        notaAtivaIndex: notaAtivaIndex.value,
        fonteSelecionada: fonteSelecionada.value,
        corSelecionada: corSelecionada.value,
      }),
    );
  },
  { deep: true }, // necessário pra detectar mudanças DENTRO dos textareas (texto digitado)
);

function adicionarNota() {
  notas.value.push({
    titulo: `Nota ${notas.value.length + 1}`,
    textoEsquerda: "",
    textoDireita: "",
  });
  notaAtivaIndex.value = notas.value.length - 1;
}

function fecharNota(index: number) {
  if (notas.value.length <= 1) return; // impede fechar a última nota

  notas.value.splice(index, 1);

  if (notaAtivaIndex.value >= notas.value.length) {
    notaAtivaIndex.value = Math.max(0, notas.value.length - 1);
  }
}

function textoCompleto() {
  return `${notaAtiva.value.textoEsquerda}\n\n${notaAtiva.value.textoDireita}`.trim();
}

function exportarTxt() {
  const blob = new Blob([textoCompleto()], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, `${notaAtiva.value.titulo}.txt`);
}

function exportarPdf() {
  const doc = new jsPDF();
  const texto = textoCompleto();
  const linhas = doc.splitTextToSize(texto, 180); // quebra automática de linha na largura da página
  doc.text(linhas, 15, 20);
  doc.save(`${notaAtiva.value.titulo}.pdf`);
}

async function exportarDocx() {
  const texto = textoCompleto();
  const paragrafos = texto
    .split("\n")
    .map((linha) => new Paragraph({ children: [new TextRun(linha)] }));

  const doc = new Document({
    sections: [{ children: paragrafos }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${notaAtiva.value.titulo}.docx`);
}
</script>

<template>
  <div class="flex flex-col items-center gap-6 p-8">
    <div class="flex gap-4">
      <select
        v-model="fonteSelecionada"
        class="font-mono text-sm bg-mauve-200 rounded p-1"
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
        class="font-mono text-sm bg-mauve-200 rounded w-24 h-9 p-1"
      >
        <option disabled value="">Cores</option>
        <option v-for="cor in cores" :key="cor.classe" :value="cor.classe">
          {{ cor.label }}
        </option>
      </select>

      <div class="flex gap-3">
      <button
        @click="exportarTxt"
        class="font-mono text-xs bg-slate-700 text-white px-3 py-1 rounded"
      >
        Exportar .txt
      </button>
      <button
        @click="exportarPdf"
        class="font-mono text-xs bg-slate-700 text-white px-3 py-1 rounded"
      >
        Exportar .pdf
      </button>
      <button
        @click="exportarDocx"
        class="font-mono text-xs bg-slate-700 text-white px-3 py-1 rounded"
      >
        Exportar .docx
      </button>
    </div>
    </div>

    <div class="relative max-w-4xl w-full">
      <img
        src="/src/assets/bloco-de-notas.png"
        alt="Bloco de notas do Adventure Notes"
        class="w-full h-auto"
      />
      <!-- Marcadores de aba, grudados na borda esquerda do livro -->
      <div class="absolute right-full top-[10%] flex flex-col translate-x-10">
        <div
          v-for="(nota, index) in notas"
          :key="index"
          class="relative w-15 h-20 -mb-1"
        >
          <button
            @click="notaAtivaIndex = index"
            class="relative w-full h-full transition-transform"
            :class="index === notaAtivaIndex ? 'translate-x-1 z-10' : 'z-0'"
          >
            <img
              :src="marcador"
              :alt="nota.titulo"
              class="w-full h-full object-contain scale-x-[-1]"
            />
          </button>

          <button
            @click.stop="fecharNota(index)"
            class="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-red-800 text-white rounded-full text-[10px] leading-none z-20"
            title="Fechar aba"
          >
            ×
          </button>
        </div>

        <button
          @click="adicionarNota"
          class="w-10 h-10 mt-2 flex items-center justify-center bg-amber-800 text-amber-50 rounded font-mono text-lg"
          title="Nova aba"
        >
          +
        </button>
      </div>

      <textarea
        v-model="notaAtiva.textoEsquerda"
        placeholder="Era uma vez uma nota..."
        :class="[
          'absolute top-[16%] left-[14%] w-[32%] h-[60%] bg-transparent resize-none border-none outline-none overflow-y-auto text-sm leading-relaxed',
          fonteSelecionada,
          corSelecionada,
        ]"
      ></textarea>

      <textarea
        v-model="notaAtiva.textoDireita"
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
