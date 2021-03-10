
const Demo = () => import(/* webpackChunkName: "Demo" */  'private/demo/index.vue')
const Contact = () => import(/* webpackChunkName: "DeContactmo" */  'private/contacts/index.vue')


export default [
    { path: 'demo', name: "demo", component: Demo },
    { path: 'contacts', name: "contacts", component: Contact },
]

