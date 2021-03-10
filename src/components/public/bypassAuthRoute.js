import store from '@/store'

export default function (from, to, next) {
  store.dispatch('session/verifyAuthentication')
  .then(() => {
    next({ name: 'demo' })
  })
  .catch(() => {
    next()
  })
}
