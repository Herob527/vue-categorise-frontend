<script setup lang="ts">
import bindings from '@/actions/bindings';
import ActionButton from '@/components/ActionButton.vue';
import DataTable from '@/components/DataTable.vue';
import TableActionPanel, {
  type Buttons,
} from '@/components/Startup/TableActionPanel.vue';
import AddFilesModal from '@/components/Startup/AddFilesModal.vue';
import { ENTRIES_PER_PAGE } from '@/constants';
import { useBindingsStore } from '@/stores/bindingsStore';
import { Status, type Entry } from '@/types/shared';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import ModalComponent from '@/components/ModalComponent.vue';
import audios from '@/actions/audios';
import type { AxiosError } from 'axios';

type Modes = 'DB' | 'LOCAL';

const showMode = ref<Modes>('DB');

const dbPage = ref(0);
const localPage = ref(0);

const isDeleteModalVisible = ref(false);

const isAddFilesVisible = ref(false);

const queryClient = useQueryClient();

const { data: transcriptData, refetch } = useQuery({
  queryKey: ['get-paginated-transcript', dbPage],
  queryFn: () =>
    bindings.getPaginated({
      page: dbPage.value,
      pageSize: ENTRIES_PER_PAGE,
    }),
});

const { t } = useI18n();

const bindingsStore = useBindingsStore();

const transformtedData = computed(() => {
  if (!transcriptData.value) return [];
  return transcriptData.value.items.map(
    (entry) =>
      ({
        id: entry.binding.id,
        file: new File([], entry.audio.file_name),
        status: Status.IN_DB,
        duration: entry.audio.audio_length,
        filename: entry.audio.file_name,
      }) satisfies Entry,
  );
});

const removeFile = async (id: string) => {
  await bindings.deleteOne({ id });
  const result = await refetch();
  if (result.data?.items.length === 0 && dbPage.value > 0) {
    dbPage.value -= 1;
  }
};

const removeAllOnPage = async () => {
  await Promise.allSettled(
    transformtedData.value.map((entry) => bindings.deleteOne({ id: entry.id })),
  );
  const { data } = await refetch();
  if (data?.items.length !== 0) {
    await removeAllOnPage();
  }
};

type ModeConfig = Record<
  Modes,
  {
    data: Entry[];
    itemsCount: number;
    fields: readonly string[];
    pagination: number;
    paginationKey: string;
    deleteAll: () => Promise<void> | void;
    deleteOne: (id: string) => Promise<void> | void;
    setPagination: (newPage: number) => void;
    cellValue: (entry: Entry) => string;
    disabledButtons: string[];
    isDb: boolean;
  }
>;
const modesConfig = computed(
  () =>
    ({
      DB: {
        data: transformtedData.value,
        itemsCount: transcriptData.value?.pagination.total ?? 0,
        fields: ['File name', 'Duration', 'Actions'],
        pagination: dbPage.value,
        paginationKey: 'db',
        deleteAll: removeAllOnPage,
        deleteOne: removeFile,
        setPagination: (newPage) => (dbPage.value = newPage),
        cellValue: (entry) =>
          entry.duration ? `${entry.duration.toFixed(2)} s.` : '???',
        disabledButtons: ['SUBMIT'] as const,
        isDb: true,
      },
      LOCAL: {
        data: bindingsStore.getAll.slice(
          ENTRIES_PER_PAGE * localPage.value,
          ENTRIES_PER_PAGE * localPage.value + ENTRIES_PER_PAGE,
        ),
        itemsCount: bindingsStore.getAll.length,
        fields: ['File name', 'Status', 'Actions'],
        pagination: localPage.value,
        paginationKey: 'local',
        deleteAll: () => {
          bindingsStore.removeAll();
        },
        deleteOne: (id) => {
          bindingsStore.remove(id);
        },
        setPagination: (newPage) => (localPage.value = newPage),
        cellValue: (entry) => t(entry.status),
        disabledButtons: [] as const,
        isDb: false,
      },
    }) satisfies ModeConfig,
);

const mode = computed(() => modesConfig.value[showMode.value]);

const sendPending = async () => {
  const all = bindingsStore.getAllSendable;
  all.forEach((entry) => {
    bindingsStore.updateFileStatus(entry.id, Status.PROCESSING);
  });
  const requests = all.map((entry) => async () => {
    const postData = await bindings.post({
      audio: entry.file,
      category: entry.category,
    });
    await audios.uploadAudio(postData.binding_id, entry.file);
  });
  const CHUNK_SIZE = 10;
  // Chunk the requests into groups of CHUNK_SIZE
  const chunkAmount = Math.ceil(requests.length / CHUNK_SIZE);

  const chunkArray = Array.from({ length: chunkAmount }).map((_, index) =>
    requests.slice(index * CHUNK_SIZE, (index + 1) * CHUNK_SIZE),
  );

  for (const [chunkIndex, chunk] of chunkArray.entries()) {
    for (let index = 0; index < chunk.length; index++) {
      const file = all[index + chunkIndex * CHUNK_SIZE];
      bindingsStore.updateFileStatus(file.id, Status.PROCESSING);
    }

    const responses = await Promise.allSettled(
      chunk.map((request) => request()),
    );

    for (const [index, response] of responses.entries()) {
      const file = all[index + chunkIndex * CHUNK_SIZE];
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (file) {
        if (response.status === 'rejected') {
          const isDuplicate = (response.reason as AxiosError).status === 409;
          console.log(isDuplicate);
          bindingsStore.updateFileStatus(
            file.id,
            isDuplicate ? Status.ERROR_DUPLICATE : Status.ERROR,
          );
        } else {
          bindingsStore.updateFileStatus(file.id, Status.IN_DB);
        }
      }
    }
  }

  await queryClient.invalidateQueries({
    queryKey: ['get-paginated-transcript'],
  });
};

type ReturnData = {
  files: File[];
  category: string;
};
const handleSubmit = ({ files, category }: ReturnData) => {
  isAddFilesVisible.value = false;
  bindingsStore.addFiles(files, category.trim() === '' ? undefined : category);
  showMode.value = 'LOCAL';
};

const disabledButtons = computed(() => {
  const disabled: Buttons[] = [];
  if (showMode.value === 'LOCAL' && bindingsStore.getAllSendable.length === 0) {
    disabled.push('SUBMIT');
  }

  if (mode.value.data.length === 0) {
    disabled.push('DELETE');
  }
  const result = [
    ...mode.value.disabledButtons,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ...disabled,
  ] as const satisfies Buttons[];
  return result;
});
</script>
<template>
  <main>
    <TableActionPanel
      :disabled-buttons="disabledButtons"
      @upload-click="isAddFilesVisible = true"
      @delete="() => (isDeleteModalVisible = true)"
      @submit="sendPending()" />

    <DataTable
      :data="mode.data"
      :class-name="`rounded-xl border-2 border-primary-500 overflow-clip`"
      :item-keys="mode.fields"
      :page-size="ENTRIES_PER_PAGE"
      :items-count="mode.itemsCount"
      :page="mode.pagination"
      :pagination-key="mode.paginationKey"
      @submit:page="mode.setPagination">
      <template #top-heading>
        <div class="flex flex-row bg-primary-600 p-2 justify-between">
          <p class="text-2xl font-bold text-white uppercase">
            Summary - {{ showMode }}
          </p>
          <div
            class="text-white flex flex-row gap-2 items-center justify-center">
            <button
              type="button"
              :class="[
                'cursor-pointer px-4 py-[4px] rounded-l-2xl transition-colors',
                mode.isDb ? 'bg-primary-500' : 'bg-primary-450',
              ]"
              @click="
                showMode = 'DB';
                dbPage = 0;
              ">
              DB
            </button>
            <button
              type="button"
              :class="[
                'cursor-pointer px-4 py-[4px] rounded-r-2xl transition-colors',
                !mode.isDb ? 'bg-primary-500' : 'bg-primary-450',
              ]"
              @click="
                showMode = 'LOCAL';
                localPage = 0;
              ">
              Local
            </button>
          </div>
        </div>
      </template>
      <template #fallback>
        <span class="p-4">Nothing there yet</span>
      </template>

      <template #item="{ index, entry }">
        <div
          :class="[
            'w-full text-center',
            index % 2 == 0
              ? 'bg-gray-200 hover:bg-gray-300'
              : 'hover:bg-gray-100',
            'flex flex-row justify-center items-center py-2',
          ]">
          <div class="flex-1">
            <span
              class="py-1 px-2 rounded-lg cursor-text"
              :title="entry.filename">
              {{
                entry.filename.length > 15
                  ? entry.filename.slice(0, 15) + '...'
                  : entry.filename
              }}
            </span>
          </div>

          <div class="flex-1">
            <span class="flex flex-col justify-center items-center py-2 px-4">{{
              mode.cellValue(entry)
            }}</span>
          </div>

          <div class="flex-1">
            <ActionButton
              :on-click="() => mode.deleteOne(entry.id)"
              class-name="bg-red-500 text-white px-4 py-4 relative rounded-md hover:bg-red-700 "
              label="Delete">
              <font-awesome-icon
                :icon="faTrash"
                class="absolute top-1/2 left-1/2 w-1/2 h-1/2 text-white -translate-x-1/2 -translate-y-1/2" />
            </ActionButton>
          </div>
        </div>
      </template>
      <template #loadingItem="{ index }">
        <span
          :class="`w-full ${index % 2 == 1 ? 'bg-gray-200 hover:bg-gray-300' : 'hover:bg-gray-100'} h-[50px] animate-pulse`">
          &nbsp;
        </span>
      </template>
    </DataTable>

    <ModalComponent
      v-if="isAddFilesVisible"
      title="Add Files"
      @close="isAddFilesVisible = false">
      <AddFilesModal
        @submit="({ files, category }) => handleSubmit({ files, category })" />
    </ModalComponent>
    <ModalComponent
      v-if="isDeleteModalVisible"
      title="Are you sure"
      @close="isDeleteModalVisible = false">
      <div class="flex flex-col gap-1">
        <span>Are you sure you want to delete every file? </span>
        <span
          >It'll affect
          <b>{{ showMode === 'DB' ? 'remote' : 'local' }} entries</b>
          only
        </span>
        <b>Mind there is no coming back after that</b>
        <div class="flex flex-row gap-2 mt-4">
          <button
            class="bg-primary-500 text-white px-4 py-2 relative rounded-md hover:bg-primary-700 border-primary-600 border-2"
            @click="isDeleteModalVisible = false">
            Cancel
          </button>
          <button
            class="bg-red-500 text-white px-4 py-2 relative rounded-md hover:bg-red-700 border-2 border-transparent"
            @click="
              () => {
                isDeleteModalVisible = false;
                mode.deleteAll();
              }
            ">
            Confirm
          </button>
        </div>
      </div>
    </ModalComponent>
  </main>
</template>
