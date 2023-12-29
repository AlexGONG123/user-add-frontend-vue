<template>
    <div>
        <el-result
        icon="warning"
        title="404 Not Found Page"
        sub-title="Please return back to the main page"
      >
        <template #extra>
          <el-button type="primary" @click="$router.push('/')">Back</el-button>
        </template>
      </el-result>
    </div>
</template>