<template>
  <div>
    <div v-if="$auth.user.status == 'Active'" class="card rounded-0 mb-0 px-2">

      <div class="divider">
        <hr />
      </div>

      <div class="card-header row">
        <div class="col-3">
          <b-form-input v-model="keyword" placeholder="Buscar usuário"></b-form-input>
        </div>
        <div class="col-3">
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
        <div class="col-3">
          <b-form-group label="Sentido da ordenação" v-slot="{ ariaDescribedby }">
            <b-form-radio :disabled="sort.length > 1" v-model="direction" :aria-describedby="ariaDescribedby" name="some-radios" value="asc">Menor para o maior</b-form-radio>
            <b-form-radio :disabled="sort.length > 1" v-model="direction" :aria-describedby="ariaDescribedby" name="some-radios" value="desc">Maior para o menor</b-form-radio>
          </b-form-group>
        </div>
        <div class="col-3">
          <b-button variant="primary" @click="searchUsers()" class="mr-2">
            Buscar
          </b-button>
          <b-button variant="outline-primary" @click="clearFilters()" class="mr-2">
            Limpar
          </b-button>
        </div>
      </div>

      <div class="card-content">
        <div class="card-body pt-1">
          <div>
            <b-table striped hover :items="users" :fields="isAdmin ? fieldsAdmin : fieldsRegular">
              <template #cell(remove_user)="data">
                <b-button variant="danger" size="sm" @click="deleteUser(data.item.id)" class="mr-2">
                  Remover
                </b-button>
              </template>
              <template #cell(suspend_user)="data">
                <b-button variant="danger" size="sm" @click="suspendUser(data.item.id)" class="mr-2">
                  <span v-if="data.item.status == 'Active'">Suspender</span>
                  <span v-else>Ativar</span>
                </b-button>
              </template>

            </b-table>
          </div>
        </div>
      </div>

    </div>
    <div v-else class="card rounded-0 mb-0 px-2">
      <h4 class="m-1">Você está suspenso. Fale com um admin.</h4>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ListPage',
  layout: 'navbar',
  middleware: 'auth',
  data() {
    return {
      users: [],
      keyword: '',
      sort: [],
      direction: 'asc',
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
    this.getAllUsers()
  },
  computed: {
    isAdmin() {
      return this.$auth.user.role == 'Admin'
    }
  },
  methods: {
    getAllUsers() {
      this.$axios.$get('api/v1/users').then((response) => {
        this.users = response
      })
    },
    deleteUser(id) {
      this.$axios.$delete(`api/v1/admin/users/${id}`)
                 .then((response) => {
        this.users = this.users.filter(user => user.id != id)
      })
    },
    suspendUser(id) {
      this.$axios.$get(`api/v1/admin/users/${id}/suspend`)
                 .then((response) => {
        var user = this.users.find(user => user.id == id)
        user.status = response.status
      })
    },
    searchUsers() {
      this.$axios.$post('api/v1/users/search',
                       { keyword: this.keyword,
                         sort: this.sort,
                         direction: this.direction })
                 .then((response) => {
        this.users = response
      })
    },
    clearFilters() {
      this.keyword = ''
      this.sort = []
      this.getAllUsers()
    }
  }
}
</script>
