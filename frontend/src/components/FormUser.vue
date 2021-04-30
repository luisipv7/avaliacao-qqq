<template>
  <div class="flex flex-center q-pt-lg">
    <q-card style="width: 600px; max-width: 80vw;">
      <q-card-section class="bg-primary fit on-center">
        <q-img
          src="~assets/logo@2x.png"
          style="width: 150px"
        />
      </q-card-section>
      <q-card-section class="q-pa-md">
        <q-input
          outlined
          v-model="Form.nome"
          label="Nome"
          class="q-pa-md"
        />
        <q-input
          outlined
          v-model="Form.password"
          label="Senha"
          class="q-pa-md"
        />
        <q-input
          outlined
          v-model="Form.passwordConfirmed"
          label="Confirmar Senha"
          class="q-pa-md"
        />
      </q-card-section>
      <q-card-actions align="between" class="bg-primary text-white">
        <q-btn
          flat
          label="Resetar"
        />
        <q-btn
          flat
          label="Confirmar"
        />
      </q-card-actions>
    </q-card>

  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
const factoryForm = JSON.stringify({
  nome: '',
  password: '',
  id: null
})
export default {
  name: 'ComponentFormUser',
  data () {
    return {
      Form: {
        nome: '',
        password: ''
      },
      passwordConfirmed: ''
    }
  },
  asyncData: {
    FormDefault: JSON.parse(factoryForm),
    async Form () {
      const token = localStorage.getItem('ACCESS_TOKEN')
      this.decode = await jwtDecode(token)
      const id = this.decode.sub

      if (!id) {
        return JSON.parse(factoryForm)
      }

      const axiosConfig = {
        method: 'get',
        url: `/usuario/${id}`
      }
      const Response = await this.$axios(axiosConfig).then(R => R.data).catch(this.AxiosCatch)
      return Response
    }
  }
}
</script>
