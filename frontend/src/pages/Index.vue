<template>
  <q-page padding>
    <q-input
      rounded
      outlined
      v-model="search"
      label="Pesquisar..."
      class="q-pb-md"
    />
    <div>
      <q-list
        padding
        class="q-gutter-lg scroll"
        v-if="responseFollowers.length > 0"
      >
        <q-item
          v-for="data in responseFollowers"
          :key="data.id"
        >
          <q-item-section
            top
            avatar
          >
            <q-avatar
              color="primary"
              text-color="white"
              rounded
            >
              {{ data.nome[0] }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ data.nome }}</q-item-label>
            <q-item-label
              v-for="texto in data.tweet"
              :key="texto.id"
              caption
            >{{ texto.texto }}</q-item-label>
          </q-item-section>

          <q-item-section
            side
            top
          >
            <q-item-label caption>meta</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <div
        flat
        v-else
        class="q-gutter-md"
      >
        <q-card
          v-for="user in filterUser"
          :key="user.item"
          class="bg-grey"
        >
          <q-card-section class="row ">
            <div class="col-3">
              <q-avatar
                color="primary"
                text-color="white"
                rounded
              >{{ user.item.nome[0] }}</q-avatar>
              Nome: {{ user.item.nome }}
            </div>
            <div class="col-9 float-right q-px-xl">
              <q-img
                src="~assets/logo@2x.png"
                style="width: 150px"
              />
            </div>
          </q-card-section>
          <q-card-section
            v-for="tweet in user.item.tweet"
            :key="tweet.id"
          >
            Tweet:
            <q-separator />
            <div> {{ tweet.texto }}</div>
          </q-card-section>
          <q-card-actions
            align="center"
            class="bg-primary"
          >
            <q-btn
              flat
              class="text-white full-width"
              label="Deixar de Seguir"
              v-if="seguidos.map(R => R.id).includes(user.item.id)"
              @click="deixaDeSeguir(user.item.id)"
            />
            <q-btn
              flat
              class="text-white full-width"
              label="Seguir"
              v-if="!seguidos.map(R => R.id).includes(user.item.id)"
              @click="seguir(user.item.id)"
            />
          </q-card-actions>
        </q-card>

      </div>

    </div>
  </q-page>
</template>

<script>
import Fuse from 'fuse.js'
import jwtDecode from 'jwt-decode'
import _ from 'lodash'
export default {
  name: 'PageIndex',
  data () {
    return {
      search: '',
      auxResponseFollowers: [],
      seguidos: []
    }
  },
  asyncData: {
    async responseUser () {
      const axiosConfig = {
        method: 'get',
        url: '/usuario'
      }
      const Response = await this.$axios(axiosConfig).then(R => R.data).catch(this.AxiosCatch)
      return Response
    },
    async responseFollowers () {
      const token = localStorage.getItem('ACCESS_TOKEN')
      this.decode = await jwtDecode(token)
      const id = this.decode.sub
      let arryUsers = []

      const axiosConfig = {
        method: 'get',
        url: `/seguidores/${id}`
      }

      const Response = await this.$axios(axiosConfig).then(R => R.data.lst_usuarios_seguidos.map(res => ({
        id: res
      }))).catch((e) => { arryUsers = 0 })
      this.seguidos = Response

      arryUsers = _.intersectionBy(this.responseUser, Response, 'id')

      this.auxResponseFollowers = arryUsers

      return arryUsers
    }
  },
  watch: {
    search (val) {
      console.log(val.length)
      if (val) {
        this.responseFollowers = []
      } else if (val.length <= 0) {
        this.responseFollowers = this.auxResponseFollowers
      }
    }
  },
  computed: {
    filterUser () {
      if (!this.search.length) return this.responseFollowers
      const options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        findAllMatches: true,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ['nome', 'tweet.texto']
      }
      const fuse = new Fuse(this.responseUser, options)
      return fuse.search(this.search).slice(0, 5)
    }
  },
  methods: {
    async deixaDeSeguir (id) {
      const token = localStorage.getItem('ACCESS_TOKEN')
      this.decode = await jwtDecode(token)
      const usuarioId = this.decode.sub
      const data = {
        usuario_id: usuarioId,
        lst_usuarios_seguidos: [id]
      }
      const axiosConfig = {
        method: 'put',
        url: `/seguidores/deixar_de_seguir/${usuarioId}`,
        data: JSON.parse(JSON.stringify(data))
      }
      console.log('axiosConfig', axiosConfig)
      await this.$axios(axiosConfig).then(R => R.data).catch(this.AxiosCatch)
      await this.asyncReload('responseFollowers')
    },
    async seguir (id) {
      const lstUsuariosSeguidos = await this.seguidos.map(R => R.id)
      await lstUsuariosSeguidos.push(id)
      const token = localStorage.getItem('ACCESS_TOKEN')
      this.decode = await jwtDecode(token)
      const usuarioId = this.decode.sub
      const data = {
        usuario_id: usuarioId,
        lst_usuarios_seguidos: lstUsuariosSeguidos
      }
      const axiosConfig = {
        method: 'put',
        url: `/seguidores/seguir/${usuarioId}`,
        data: JSON.parse(JSON.stringify(data))
      }
      console.log('axiosConfig', axiosConfig)
      await this.$axios(axiosConfig).then(R => R.data).catch(this.AxiosCatch)
      await this.asyncReload('responseFollowers')
    }
  }
}
</script>
