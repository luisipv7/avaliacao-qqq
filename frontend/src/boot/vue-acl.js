import { AclInstaller, AclCreate, AclRule } from 'vue-acl'
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  Vue.use(AclInstaller)
  const aclcreate = new AclCreate({
    initial: 'unauthenticated',
    notfound: '/',
    router,
    acceptLocalRules: true,
    globalRules: {
      isAuthenticated: new AclRule('authenticated').generate(),
      isUnauthenticated: new AclRule('unauthenticated').generate()
      // isEveryone: new AclRule('authenticated').or('unauthenticated').generate()
    }
  })

  Vue.use(aclcreate)
}
