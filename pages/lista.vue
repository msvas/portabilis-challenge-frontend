<template>
  <div>
    <div class="card rounded-0 mb-0 px-2">

      <div class="divider">
        <hr />
      </div>

      <div class="card-content">
        <div class="card-body pt-1">
          <div>
            <b-table striped hover :items="users" :fields="fields"></b-table>
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
      fields: [
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
          }
        ],
    };
  },
  mounted() {
    this.$axios.$get('api/v1/users').then((response) => {
      console.log('-----')
      console.log(response)
      this.users = response
    })
  },
  methods: {

  }
}
</script>
