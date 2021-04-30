<template>
  <q-layout view="lHr lpR lfr">

    <q-header
      elevated
      class="bg-primary text-white"
    >
      <q-toolbar>
        <q-toolbar-title>
          <q-img
            src="~assets/logo@2x.png"
            spinner-color="white"
            style="width: 150px"
            class="cursor-pointer"
            @click="goBackHome()"
          />

        </q-toolbar-title>
        <div>
          <q-btn-dropdown
            flat
            dense
            no-icon-animation
          >
            <div class="q-pa-xs">
              <q-avatar
                size="72px"
                color="primary"
                @click="go()"
                text-color="white"
                class="cursor-pointer"
              >
                {{ FirstName }}
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs"></div>

              <q-btn
                color="primary"
                label="Logout"
                push
                @click="Logout()"
                size="sm"
                v-close-popup
              />
            </div>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import ComponentFormUser from '../components/FormUser'
import jwtDecode from 'jwt-decode'

export default {
  data () {
    return {
      left: true,
      right: true,
      FirstName: localStorage.getItem('FIRST_LETTER_NAME')
    }
  },
  methods: {
    Logout () {
      localStorage.removeItem('ACCESS_TOKEN')
      localStorage.removeItem('FIRST_LETTER_NAME')
      this.$acl.change('unauthenticated')
      this.$router.push('/')
    },
    async edit () {
      const token = localStorage.getItem('ACCESS_TOKEN')
      this.decode = await jwtDecode(token)
      const id = this.decode.sub

      this.$q.dialog({
        component: ComponentFormUser,
        parent: this,
        id
      })
        .onOk(() => this.$q.notify({ message: 'Edição ok!', type: 'positive' }))
    },
    go () {
      this.$router.push('/Editar')
    },
    goBackHome () {
      this.$router.push('/')
    }
  }
}
</script>
