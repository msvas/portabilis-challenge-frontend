<template>
  <div>
    <div class="card rounded-0 mb-0 px-2">

      <div class="divider">
        <hr />
      </div>

      <div class="card-header row">
        <div class="col-5">
          <b-form-input v-model="keyword" placeholder="Buscar usuário"></b-form-input>
        </div>
        <div class="col-5">
          <b-form-group
            label="Ordenar por"
          >
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="sort"
              name="flavour-2"
            >
              <b-form-checkbox value="name">Nome</b-form-checkbox>
              <b-form-checkbox value="email">Email</b-form-checkbox>
              <b-form-checkbox value="role">Nível de acesso</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </div>
        <div class="col-2">
          <b-button variant="primary" @click="searchUsers()" class="mr-2">
            Buscar
          </b-button>
        </div>
      </div>

      <div class="card-content">
        <div class="card-body pt-1">
          <div>
            <b-table striped hover :items="users" :fields="isAdmin ? fieldsAdmin : fieldsRegular">
              <template #cell(remove_user)="data">
                <b-button size="sm" @click="deleteUser(data.item.id)" class="mr-2">
                  Remover
                </b-button>
              </template>
              <template #cell(suspend_user)="data">
                <b-button size="sm" @click="suspendUser(data.item.id)" class="mr-2">
                  <span v-if="data.item.status == 'Active'">Suspender</span>
                  <span v-else>Ativar</span>
                </b-button>
              </template>

            </b-table>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'ListPage',
  layout: 'full',
  data() {
    return {
      users: [],
      keyword: null,
      sort: [],
      fieldsRegular: [
        {
          key: 'id',
          sortable: false
        },
        {
          key: 'name',
          sortable: true,
          label: 'Nome'
        },
        {
          key: 'email',
          sortable: true,
        },
        {
          key: 'status',
          sortable: false,
        },
        {
          key: 'role',
          sortable: true,
          label: 'Nível de acesso'
        },
      ],
      fieldsAdmin: [
          {
            key: 'id',
            sortable: false
          },
          {
            key: 'name',
            sortable: true,
            label: 'Nome'
          },
          {
            key: 'email',
            sortable: true,
          },
          {
            key: 'role',
            sortable: true,
            label: 'Nível de acesso'
          },
          {
            key: 'status',
            sortable: false,
          },
          {
            key: 'remove_user',
            label: 'Remover usuário'
          },
          {
            key: 'suspend_user',
            label: 'Suspender/Ativar'
          }
        ],
    };
  },
  mounted() {
    this.$axios.$get('api/v1/users').then((response) => {
      this.users = response
    })
  },
  computed: {
    isAdmin() {
      return true
    }
  },
  methods: {
    deleteUser(id) {

    },
    suspendUser(id) {

    },
    searchUsers() {
      this.$axios.post('api/v1/users/search',
                       { keyword: this.keyword,
                         sort: this.sort })
                 .then((response) => {
        this.users = response.data
      })
    }
  }
}
</script>
