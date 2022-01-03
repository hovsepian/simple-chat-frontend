<template>
  <h2 class="title"><slot></slot></h2>
</template>

<style lang="scss">
  .title{
    font-size: 2rem;
    margin-top: 0;
    margin-bottom: 1.5rem;

    &.center{
      text-align: center;
    }
    &.ns{
      margin-bottom: 0;
    }
  }
</style>
