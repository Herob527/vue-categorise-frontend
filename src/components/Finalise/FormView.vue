<script lang="ts" setup>
import { useFinaliseStore } from '@/stores/finaliseStore';
import type { MutationStatus } from '@tanstack/vue-query';
import { ref } from 'vue';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import ActionButton from '../ActionButton.vue';
import ModalComponent from '../ModalComponent.vue';

defineProps<{ submitStatus: MutationStatus }>();

const entriesInLine = [
  'file',
  'text',
  'category',
  'category_index',
  'duration',
];

enum ERRORS {
  INVALID_FORMAT = 'INVALID_FORMAT',
  EMPTY_CATEGORY = 'EMPTY_CATEGORY',
}

const values = useFinaliseStore();

const errors = ref<ERRORS[]>([]);
const isHelpOpen = ref(false);

const validate = () => {
  errors.value = [];

  const formatEntries = values.line_format.matchAll(/\{(.*?)\}/g);

  for (const [, group] of formatEntries) {
    if (
      entriesInLine.indexOf(group) === -1 &&
      !errors.value.includes(ERRORS.INVALID_FORMAT)
    ) {
      errors.value.push(ERRORS.INVALID_FORMAT);
    }
  }
  if (values.uncaterized_name.trim() === '') {
    errors.value.push(ERRORS.EMPTY_CATEGORY);
  }
  if (errors.value.length > 0) {
    return false;
  }
  return true;
};

defineEmits(['submit']);
</script>

<template>
  <section
    class="flex flex-col gap-2 p-2 rounded-xl border-2 border-primary-500"
  >
    <header class="flex flex-row gap-2 items-center">
      <h2 class="text-2xl font-bold">Finalise options</h2>
      <ActionButton
        @click="isHelpOpen = !isHelpOpen"
        class-name="bg-blue-500 text-white p-4 rounded-xl relative"
      >
        <font-awesome-icon
          :icon="faQuestion"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </ActionButton>
    </header>
    <ModalComponent v-if="isHelpOpen" @close="isHelpOpen = false">
      <div class="flex flex-col gap-2 mt-2">
        <h2 class="text-2xl font-bold">Help</h2>
        <div class="p-2 bg-white text-primary-500">
          <h3 class="text-xl font-bold">Omit empty texts</h3>

          <div class="pl-2">
            <div class="flex flex-row gap-2">
              <input type="checkbox" checked readonly />
              <span
                >Empty transcripts will be <b>omitted</b> in generated
                transcript</span
              >
            </div>
            <div class="flex flex-row gap-2">
              <input type="checkbox" readonly />
              <span
                >Empty transcripts will be <b>incluced</b> in generated
                transcript</span
              >
            </div>
          </div>
        </div>
        <div class="p-2 bg-white text-primary-500">
          <h3 class="text-xl font-bold">Divide by category</h3>
          <div class="pl-2">
            <div class="flex flex-row gap-2">
              <input type="checkbox" checked readonly />
              <span
                >Audio files will <b>be divided</b> by category (in different
                directories)</span
              >
            </div>
            <div class="flex flex-row gap-2">
              <input type="checkbox" readonly />
              <span>
                <span
                  >Audio files will <b>share</b> one directory regardless of
                  category</span
                >
              </span>
            </div>
            <span
              >Note: In both case, categories will be assigned in
              transcript</span
            >
          </div>
        </div>
        <div class="p-2 bg-white text-primary-500">
          <h3 class="text-xl font-bold">Export transcript</h3>
          <div class="pl-2">
            <div class="flex flex-row gap-2">
              <input type="checkbox" checked readonly />
              <span>Transcript <b>will</b> be generated</span>
            </div>
            <div class="flex flex-row gap-2">
              <input type="checkbox" readonly />
              <span>
                <span>Transcript <b>won't</b> be generated</span>
              </span>
            </div>
          </div>
        </div>
        <div class="p-2 bg-white text-primary-500">
          <h3 class="text-xl font-bold">Uncategorized name</h3>
          <p class="pl-2">
            Name of category for uncatergized audio files in output
          </p>
          <p class="pl-2">It's required</p>
        </div>

        <div class="p-2 bg-white text-primary-500">
          <h3 class="text-xl font-bold">Line format</h3>
          <div class="flex flex-col pl-2 class">
            <span> Format of line in transcript </span>
            <span
              >Text between curly brackets is used for substitution of values
              from database</span
            >
            <span> Currently supported values:</span>
            <ul class="pl-6 list-disc">
              <li><b>file</b> - file name of audio file</li>
              <li><b>text</b> - transcript of audio</li>
              <li><b>category</b> - category of audio</li>
              <li><b>category_index</b> - numeric category index of audio</li>
              <li><b>duration</b> - length of audio in seconds</li>
            </ul>
            <span class="py-2"
              ><b>Example</b>: "{file}|{text}" -> "my_file.mp3|my text"</span
            >
            <span>Currently you can use only supported values.</span>
            <span>Ones outside will throw <b>validation error</b></span>
          </div>
        </div>
      </div>
    </ModalComponent>
    <div class="flex flex-row gap-2">
      <input
        type="checkbox"
        name="omit_empty"
        id="omit_empty"
        class="accent-primary-500"
        v-model="values.omit_empty"
      />
      <label for="omit_empty">Omit empty texts</label>
    </div>
    <div class="flex flex-row gap-2">
      <input
        type="checkbox"
        name="divide_by_category"
        id="divide_by_category"
        class="accent-primary-500"
        v-model="values.divide_by_category"
      />
      <label for="divide_by_category">Divide by category</label>
    </div>

    <div class="flex flex-row gap-2">
      <input
        type="checkbox"
        name="export_transcript"
        id="export_transcript"
        class="accent-primary-500"
        v-model="values.export_transcript"
      />
      <label for="export_transcript">Export transcript</label>
    </div>
    <div class="flex flex-col gap-1">
      <label for="uncategorized_name">Uncategorized name:</label>
      <input
        type="text"
        name="uncategorized_name"
        id="uncategorized_name"
        class="p-2 w-min rounded-md border-2 disabled:text-gray-500 disabled:bg-gray-300 disabled:border-gray-400 border-primary-500"
        v-model="values.uncaterized_name"
        :disabled="!values.divide_by_category"
      />

      <span v-if="errors.includes(ERRORS.EMPTY_CATEGORY)" class="text-red-500"
        >Category cannot be empty</span
      >
    </div>
    <div class="flex flex-col gap-1">
      <label for="line_format">Line format:</label>
      <input
        type="text"
        name="line_format"
        id="line_format"
        class="p-2 w-min rounded-md border-2 disabled:text-gray-500 disabled:bg-gray-300 disabled:border-gray-400 border-primary-500"
        v-model="values.line_format"
        :disabled="!values.export_transcript"
      />
      <span v-if="errors.includes(ERRORS.INVALID_FORMAT)" class="text-red-500"
        >Invalid format</span
      >
    </div>
    <div class="flex flex-row gap-2">
      <button
        type="button"
        class="p-2 text-white bg-blue-500 rounded-md disabled:bg-gray-300"
        :disabled="submitStatus === 'pending'"
        @click="!(submitStatus === 'pending') && validate() && $emit('submit')"
      >
        <span v-if="submitStatus !== 'error'"> Submit </span>
        <span v-else> Retry </span>
      </button>
    </div>
    <div class="flex flex-row gap-2">
      <span>Status: {{ submitStatus }}</span>
    </div>
  </section>
</template>
