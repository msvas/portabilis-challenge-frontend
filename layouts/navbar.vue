<template>
  <div class="app-content content">
    <div class="content-wrapper">
      <div class="content-body">
        <b-navbar toggleable="lg" type="dark" variant="info">
          <b-navbar-brand href="/">RHCorp</b-navbar-brand>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item href="/cadastro">Cadastro</b-nav-item>
              <b-nav-item href="/lista">Usuários</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-item @click="logout()">Sair</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
        <transition name="fade" mode="out-in">
          <nuxt />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "full",
  methods: {
    logout() {
      this.$auth.logout().then(() => {
        localStorage.removeItem('access-token')
        localStorage.removeItem('uid')
        localStorage.removeItem('client')
        localStorage.removeItem('allowed')
        this.$auth.$storage.removeCookie('uid', false)
        this.$auth.$storage.removeCookie('token-type', false)
        this.$auth.$storage.removeCookie('client', false)
        this.$auth.$storage.removeCookie('access-token', false)
        this.$auth.$storage.removeCookie('expiry', false)

        this.$router.push({ path: '/' })
      })
    },
  }
};
</script>
