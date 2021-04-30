<template>
  <q-page class="flex flex-center bg-primary">
    <q-card class="q-pa-md">
      <q-card-section>
        <img src="~assets/logo@2x.png">
        <q-separator />
        <q-input
          rounded
          class="q-ma-md"
          outlined
          dense
          v-model="Form.email"
          label="Email"
        />
        <q-input
          rounded
          outlined
          dense
          class="q-ma-md"
          v-model="Form.pass"
          label="Senha"
        />

      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn
          @click.native="Login()"
          flat
          dense
        >Login</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import jwtDecode from 'jwt-decode'
export default {
  name: 'PageLogin',
  data () {
    return {
      Form: {
        email: '',
        pass: ''
      }
    }
  },
  mounted () {
    this.AutoLogin()
  },
  methods: {
    async Login () {
      const data = await JSON.parse(JSON.stringify(this.Form))
      const axiosConfig = {
        method: 'post',
        url: '/auth/login',
        data
      }
      const Response = await this.$axios(axiosConfig).then(R => R.data).catch((e) => e.this.$q.notify({
        message: 'Algo certo está errado',
        color: 'negative'
      }))
      localStorage.setItem('ACCESS_TOKEN', Response.access_token)

      await this.ShowFirstLetter()

      this.$acl.change('authenticated')
      this.$router.push('/index')
    },
    async AutoLogin () {
      const accessToken = localStorage.getItem('ACCESS_TOKEN')
      if (!accessToken) {
        this.$acl.change('unauthenticated')
        // this.$router.push('/')
      } else {
        // await localStorage.setItem('ACCESS_TOKEN', Response.access_token)
        await this.$acl.change('authenticated')
        await this.$router.push('/index')
      }
    },
    async ShowFirstLetter () {
      const token = localStorage.getItem('ACCESS_TOKEN')
      this.decode = await jwtDecode(token)
      const id = this.decode.sub

      const axiosConfig = {
        method: 'get',
        url: `/usuario/${id}`,
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }

      const Responses = await this.$axios(axiosConfig).then(R => R.data.nome).catch(this.AxiosCatch)
      await localStorage.setItem('FIRST_LETTER_NAME', Responses[0])
    }
  }
}
</script>
