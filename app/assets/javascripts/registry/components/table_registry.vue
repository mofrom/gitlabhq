<script>
import { mapActions } from 'vuex';
import { n__ } from '../../locale';
import Flash from '../../flash';
import clipboardButton from '../../vue_shared/components/clipboard_button.vue';
import tablePagination from '../../vue_shared/components/table_pagination.vue';
import tooltip from '../../vue_shared/directives/tooltip';
import timeagoMixin from '../../vue_shared/mixins/timeago';
import { errorMessages, errorMessagesTypes } from '../constants';
import { numberToHumanSize } from '../../lib/utils/number_utils';

export default {
  components: {
    clipboardButton,
    tablePagination,
  },
  directives: {
    tooltip,
  },
  mixins: [timeagoMixin],
  props: {
    repo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    shouldRenderPagination() {
      return this.repo.pagination.total > this.repo.pagination.perPage;
    },
  },
  methods: {
    ...mapActions(['fetchList', 'deleteRegistry']),

    layers(item) {
      return item.layers ? n__('%d layer', '%d layers', item.layers) : '';
    },

    formatSize(size) {
      return numberToHumanSize(size);
    },

    handleDeleteRegistry(registry) {
      this.deleteRegistry(registry)
        .then(() => this.fetchList({ repo: this.repo }))
        .catch(() => this.showError(errorMessagesTypes.DELETE_REGISTRY));
    },

    onPageChange(pageNumber) {
      this.fetchList({ repo: this.repo, page: pageNumber }).catch(() =>
        this.showError(errorMessagesTypes.FETCH_REGISTRY),
      );
    },

    showError(message) {
      Flash(errorMessages[message]);
    },
  },
};
</script>
<template>
  <div>
    <table class="table tags">
      <thead>
        <tr>
          <th>{{ s__('ContainerRegistry|Tag') }}</th>
          <th>{{ s__('ContainerRegistry|Tag ID') }}</th>
          <th>{{ s__('ContainerRegistry|Size') }}</th>
          <th>{{ s__('ContainerRegistry|Created') }}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in repo.list" :key="i">
          <td>
            {{ item.tag }}

            <clipboard-button
              v-if="item.location"
              :title="item.location"
              :text="item.location"
              css-class="btn-default btn-transparent btn-clipboard"
            />
          </td>
          <td>
            <span v-tooltip :title="item.revision" data-placement="bottom">
              {{ item.shortRevision }}
            </span>
          </td>
          <td>
            {{ formatSize(item.size) }}
            <template v-if="item.size && item.layers">
              &middot;
            </template>
            {{ layers(item) }}
          </td>

          <td>
            <span v-tooltip :title="tooltipTitle(item.createdAt)" data-placement="bottom">
              {{ timeFormated(item.createdAt) }}
            </span>
          </td>

          <td class="content">
            <button
              v-if="item.canDelete"
              v-tooltip
              :title="s__('ContainerRegistry|Remove tag')"
              :aria-label="s__('ContainerRegistry|Remove tag')"
              type="button"
              class="js-delete-registry btn btn-danger d-none d-sm-block float-right"
              data-container="body"
              @click="handleDeleteRegistry(item);"
            >
              <i class="fa fa-trash" aria-hidden="true"> </i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <table-pagination
      v-if="shouldRenderPagination"
      :change="onPageChange"
      :page-info="repo.pagination"
    />
  </div>
</template>
