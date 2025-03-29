<script setup lang="ts">
import { deleteOne, getPaginated, post } from '@/actions/bindings';
import ActionButton from '@/components/ActionButton.vue';
import DataTable from '@/components/DataTable.vue';
import TableActionPanel from '@/components/Startup/TableActionPanel.vue';
import AddFilesModal from '@/components/Startup/AddFilesModal.vue';
import { ENTRIES_PER_PAGE } from '@/constants';
import { useBindingsStore } from '@/stores/bindingsStore';
import { statuses, type Entry } from '@/types/shared';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import ModalComponent from '@/components/ModalComponent.vue';

export type dataType = { id: string; fileName: string };

type modes = 'DB' | 'LOCAL';

const showMode = ref<modes>('DB');

const dbPagination = ref(0);

const isAddFilesVisible = ref(false);

const queryClient = useQueryClient();

const { data: transcriptData, refetch } = useQuery({
  queryKey: ['get-paginated-transcript', dbPagination],
  queryFn: () =>
    getPaginated({
      page: dbPagination.value,
      pageSize: ENTRIES_PER_PAGE,
    }),
  placeholderData: {
    bindings: [],
    page: dbPagination.value,
    pagination: { total: 0 },
  },
});

const { updateFileStatus, remove, removeAll, addFiles } = useBindingsStore();
const { getAll } = storeToRefs(useBindingsStore());

const transformtedData = computed(() => {
  const offset = Array.from({
    length: dbPagination.value * ENTRIES_PER_PAGE,
  }).map(() => ({
    id: '',
    file: new File([], ''),
    status: statuses.IN_DB,
    duration: 0,
    filename: '',
  }));
  const data =
    transcriptData.value?.bindings.map(
      (entry) =>
        ({
          id: entry.binding.id,
          file: new File([], entry.audio.file_name),
          status: statuses.IN_DB,
          duration: entry.audio.audio_length,
          filename: entry.audio.file_name,
        }) satisfies Entry,
    ) ?? [];
  const merged = [...offset, ...data];
  return merged;
});

const shownData = computed(() => {
  if (showMode.value === 'DB') {
    return transformtedData.value;
  }
  return getAll.value ?? [];
});

const itemsCount = computed(() => {
  if (showMode.value === 'DB') {
    return transcriptData.value?.pagination.total ?? 0;
  }
  return getAll.value?.length ?? 0;
});

const fields = computed(() => {
  if (showMode.value === 'DB') {
    return ['File name', 'Duration', 'Actions'] as const;
  }
  return ['File name', 'Status', 'Actions'] as const;
});

const sendPending = async () => {
  const all = getAll.value;
  all.forEach((entry) => updateFileStatus(entry.id, statuses.PROCESSING));
  const promises = await Promise.allSettled(
    all.map((entry) => post({ audio: entry.file, category: entry.category })),
  );
  promises.forEach((promise, index) => {
    if (promise.status === 'rejected') {
      updateFileStatus(all[index].id, statuses.ERROR);
    } else {
      remove(all[index].id);
    }
  });
  queryClient.invalidateQueries({ queryKey: ['get-paginated-transcript'] });
};

const removeFile = async (id: string) => {
  deleteOne({ id });
  refetch();
};

const removeAllOnPage = async () => {
  await Promise.allSettled(
    transformtedData.value.map((entry) => deleteOne({ id: entry.id })),
  );
  const { data } = await refetch();
  if (data?.bindings.length !== 0) {
    removeAllOnPage();
  }
};

type ReturnData = {
  files: File[];
  category: string;
};
const handleSubmit = async ({ files, category }: ReturnData) => {
  isAddFilesVisible.value = false;
  addFiles(files, category.trim() === '' ? undefined : category);
  showMode.value = 'LOCAL';
};

const paginationKey = computed(() => {
  if (showMode.value === 'DB') {
    return 'db';
  }
  return 'local';
});
</script>
<template>
  <main>
    <TableActionPanel
      :disabled-buttons="showMode === 'DB' ? ['SUBMIT'] : []"
      @upload-click="
        () => {
          isAddFilesVisible = true;
        }
      "
      @delete="
        () => {
          if (showMode === 'DB') {
            removeAllOnPage();
          } else {
            removeAll();
          }
        }
      "
      @submit="
        () => {
          sendPending();
        }
      " />

    <DataTable
      :data="shownData ?? []"
      :class-name="`rounded-xl border-2 border-primary-500 overflow-clip`"
      :item-keys="fields"
      :page-size="ENTRIES_PER_PAGE"
      :items-count="itemsCount"
      :page="dbPagination"
      :pagination-key="paginationKey"
      @submit:page="
        (newPage: number) => {
          dbPagination = newPage;
        }
      ">
      <template #top-heading>
        <div class="flex flex-row bg-primary-600 p-2 justify-between">
          <p class="text-2xl font-bold text-white uppercase">Summary</p>
          <div
            class="text-white flex flex-row gap-2 items-center justify-center">
            <button
              type="button"
              :class="[
                'cursor-pointer px-4 py-[4px] rounded-l-2xl transition-colors',
                showMode === 'DB' ? 'bg-primary-500' : 'bg-primary-450',
              ]"
              :onClick="
                () => {
                  showMode = 'DB';
                  dbPagination = 0;
                }
              ">
              Remote
            </button>
            <button
              type="button"
              :class="[
                'cursor-pointer px-4 py-[4px] rounded-r-2xl transition-colors',
                showMode === 'LOCAL' ? 'bg-primary-500' : 'bg-primary-450',
              ]"
              :onClick="
                () => {
                  showMode = 'LOCAL';
                  dbPagination = 0;
                }
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
              showMode === 'DB' ? entry.duration : $t(entry.status)
            }}</span>
          </div>

          <div class="flex-1">
            <ActionButton
              :on-click="
                () => {
                  if (showMode === 'DB') {
                    removeFile(entry.id);
                  } else {
                    remove(entry.id);
                  }
                }
              "
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
  </main>
</template>
