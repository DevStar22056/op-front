import store from '@/store'

function main (payload, type) {
  const data = typeof payload === 'string'
    ? { message: payload, type }
    : { ...payload, type }
  store.dispatch('message/display', data, { root: true })
}

function message (payload) {
  message.success(payload)
}

message.success = function (payload) {
  main(payload, 'success')
}
message.error = function (payload) {
  main(payload, 'error')
}
message.warning = function (payload) {
  main(payload, 'warning')
}

export default message
