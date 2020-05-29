<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ fullName }}</span>
    </div>
    <el-input placeholder="Please input" :value="fixture.email" />
    <p>{{ fixture.description }}</p>
    <el-button>Save</el-button>
  </el-card>
</template>

<script>
export default {
  computed: {
    fullName() {
      return [this.fixture.first_name, this.fixture.last_name].join(' ');
    },
  },
};
</script>
