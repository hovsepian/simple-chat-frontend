<template>
  <div class="container">
    <users></users>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware: ['auth']
}
</script>
