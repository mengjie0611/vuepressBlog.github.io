<template>
  <div class="theme-container">
    <div class="content">
      <h1>404</h1>
      <blockquote>{{ getMsg() }}</blockquote>
      <router-link to="/">Take me home.</router-link>
    </div>
  </div>
</template>

<script>
  const msgs = [
    `There's nothing here.`,
    `你来到了没有知识的荒原 :(`,
    `How did we get here?`,
    `That's a Four-Oh-Four.`,
    `Looks like we've got some broken links.`
  ]

  export default {
    methods: {
      getMsg() {
        return msgs[Math.floor(Math.random() * msgs.length)]
      }
    }
  }
</script>
