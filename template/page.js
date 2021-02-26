const tmp = (project) => {
  return `
<template>
  <div>${project}</div>
</template>

<script>
  export default {
    name: '${project}',
    data() {
      return {
        title: '${project}'
      };
    }
  };
</script>
`;
};

module.exports = tmp;
