<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="card p-1 mt-4" style="width: 550px;">

      <h1 class="text-center">RHCorp</h1>

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

            <span class="text-danger text-sm" v-if="error">
              <ul>
                <li v-for="er in error" :key="er">{{er}}</li>
              </ul>
            </span>

            <button type="submit" class="btn btn-primary float-left btn-inline" style="">
              Fazer login
            </button>
          </form>

          <nuxt-link :to="{ path: '/cadastro' }">
            <button class="btn btn-outline-primary float-left btn-inline ml-2" style="">
              Criar conta
            </button>
          </nuxt-link>
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
        password: "",
      },
      error: null,
    };
  },
  methods: {
    submit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$auth.loginWith('local', { data: this.user }).then((response) => {
            this.$auth.setUser(response.data.data)
            this.$auth.$storage.setUniversal('user', this.$auth.user, true)
            this.$router.push({ path: '/lista' })
          }).catch((error) => {
            const { errors } = error.response.data;
            this.error = errors
              ? errors
              : ["Não foi possível se conectar ao backend."];
         });
        }
      });
    },
  }
}
</script>
