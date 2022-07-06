<template>
  <div>
    <div class="card rounded-0 mb-0 px-2">

      <div class="divider">
        <hr />
      </div>

      <div class="card-content">
        <div class="card-body pt-1">
          <form @submit.prevent="submit">
            <fieldset class="form-label-group form-group position-relative">
              <input
                v-model="user.email"
                v-validate="'required|email'"
                name="email"
                type="text"
                class="form-control"
                id="user-email"
                placeholder="Email"
                required
              />

              <span
                class="text-danger text-sm"
                v-show="errors.has('email')"
              >{{ errors.first('email') }}</span>

              <label for="user-email">Email</label>
            </fieldset>

            <fieldset class="form-label-group form-group position-relative">
              <input
                v-model="user.name"
                v-validate="'required'"
                name="name"
                type="text"
                class="form-control"
                id="user-name"
                placeholder="Nome"
                required
              />

              <span
                class="text-danger text-sm"
                v-show="errors.has('name')"
              >{{ errors.first('name') }}</span>

              <label for="user-email">Nome completo</label>
            </fieldset>

            <fieldset class="form-label-group position-relative">
              <input
                v-model="user.password"
                v-validate="'required'"
                name="password"
                type="password"
                class="form-control"
                id="user-password"
                placeholder="Senha"
                required
              />
              <span
                class="text-danger text-sm"
                v-show="errors.has('password')"
              >{{ errors.first('password') }}</span>

              <label for="user-password">Senha</label>
            </fieldset>

            <fieldset class="form-label-group position-relative">
              <input
                v-model="user.password_confirmation"
                v-validate="'required'"
                name="password"
                type="password"
                class="form-control"
                id="user-password"
                placeholder="Repita a senha"
                required
              />
              <span
                class="text-danger text-sm"
                v-show="errors.has('password')"
              >{{ errors.first('password') }}</span>

              <label for="user-password">Repita a senha</label>
            </fieldset>

            <span class="text-danger text-sm" v-if="error">
              <ul>
                <li v-for="er in error" :key="er">{{er}}</li>
              </ul>
            </span>

            <button type="submit" class="btn btn-primary float-left btn-inline" style="">
              Criar conta
            </button>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'full',
  data() {
    return {
      user: {
        email: "",
        name: "",
        password: "",
        password_confirmation: "",
      },
      error: null,
    };
  },
  methods: {
    submit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$axios.$post('auth', this.user).then((response) => {
            console.log(response)
            console.log('criada')
          }).catch((error) => {
            let errorResponse = error.response
            if (errorResponse) {
              // Erros vindos da API
              this.error = error.response.data.errors.full_messages
            } else
              this.error = ["Não foi possível se conectar ao backend."]
          })
        }
      });
    },
  }
}
</script>
