export default async function({ store, redirect }) {
  if (!store.getters['auth/auth']) {
    await store.dispatch('auth/fetch')

    if (!store.getters['auth/auth']) return redirect('/login')
  }
}
