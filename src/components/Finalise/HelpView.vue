<script setup lang="ts">
import ModalComponent from '../ModalComponent.vue';
defineEmits(['close']);
</script>

<template>
  <ModalComponent
    title="Help"
    @close="$emit('close')">
    <div class="flex flex-col gap-2">
      <div class="p-2 bg-white text-slate-800">
        <h3 class="text-xl font-bold">Omit empty texts</h3>

        <div>
          <div class="flex flex-row gap-2">
            <input
              type="checkbox"
              checked
              class="pointer-events-none" />
            <span
              >Empty transcripts will be <b>omitted</b> in generated
              transcript</span
            >
          </div>
          <div class="flex flex-row gap-2">
            <input
              type="checkbox"
              class="pointer-events-none" />
            <span
              >Empty transcripts will be <b>incluced</b> in generated
              transcript</span
            >
          </div>
        </div>
      </div>
      <div class="p-2 bg-white text-slate-800">
        <h3 class="text-xl font-bold">Divide by category</h3>
        <div>
          <div class="flex flex-row gap-2">
            <input
              type="checkbox"
              checked
              class="pointer-events-none" />
            <span
              >Audio files will <b>be divided</b> by category (in different
              directories)</span
            >
          </div>
          <div class="flex flex-row gap-2">
            <input
              type="checkbox"
              class="pointer-events-none" />
            <span>
              <span
                >Audio files will <b>share</b> one directory regardless of
                category</span
              >
            </span>
          </div>
          <span
            >Note: In both case, categories will be assigned in transcript</span
          >
        </div>
      </div>
      <div class="p-2 bg-white text-slate-800">
        <h3 class="text-xl font-bold">Export transcript</h3>
        <div>
          <div class="flex flex-row gap-2">
            <input
              type="checkbox"
              checked
              class="pointer-events-none" />
            <span>Transcript <b>will</b> be generated</span>
          </div>
          <div class="flex flex-row gap-2">
            <input
              type="checkbox"
              class="pointer-events-none" />
            <span>
              <span>Transcript <b>won't</b> be generated</span>
            </span>
          </div>
        </div>
      </div>
      <div class="p-2 bg-white text-slate-800">
        <h3 class="text-xl font-bold">Category to lower</h3>

        <div>
          <div class="flex flex-row gap-2">
            <input
              type="checkbox"
              checked
              class="pointer-events-none" />
            <span>Categories <b>will be</b> converted to <b>lowercase</b></span>
          </div>
          <div class="flex flex-row gap-2">
            <input
              type="checkbox"
              class="pointer-events-none" />
            <span
              >Categories <b>won't</b> be converted to <b>lowercase</b> at all
            </span>
          </div>
        </div>
      </div>
      <div class="p-2 bg-white text-slate-800">
        <h3 class="text-xl font-bold">Category whitespace substitution</h3>
        <p>Substitute whitespace in category with given character</p>
      </div>
      <div class="p-2 bg-white text-slate-800">
        <h3 class="text-xl font-bold">Uncategorized name</h3>
        <p>Name of category for uncatergized audio files in output</p>
        <p class="pl-2 font-bold">Is required</p>
      </div>

      <div class="p-2 bg-white text-slate-800">
        <h3 class="text-xl font-bold">Line format</h3>
        <div class="flex flex-col class">
          <span> Format of line in transcript </span>
          <span
            >Text between curly brackets is used for substitution of values from
            database</span
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
</template>
