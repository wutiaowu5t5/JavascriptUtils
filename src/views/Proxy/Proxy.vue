<!--
 * @Description: Proxy.vue
 * @Author: 5t5
 * @Time: 2024/6/6 17:15
-->
<template>
  <common-template :code="proxyString">
    <template #alert>
      <alert-template type="note">
        <template #content>
          这段代码定义了一个名为 DeepProxy 的类，其主要功能是创建深度代理对象或数组，以便于在访问或修改这些对象的属性时进行拦截和自定义处理<br><br>
          代码的核心价值在于：<br><br>
          深度代理创建：通过 create 方法，不仅将顶层对象或数组代理，还会递归地代理内部的所有对象和数组属性，实现了真正的深度代理。这对于需要跟踪和控制复杂数据结构的访问和修改行为非常有用。<br><br>
          代理缓存管理：内部使用 WeakMap (#cache) 来存储代理与原始对象的映射关系，这有助于资源管理，当原始对象不再被引用时，代理对象可通过垃圾回收机制自动释放，同时提供了 revoke 方法来获取原始对象或检查代理状态，增加了代理使用的灵活性和效率。<br><br>
          错误处理与类型检查：在创建代理前，会对输入的目标对象及处理器进行合法性检查，确保了方法调用的健壮性。<br><br>
          导出默认实例：类的最后通过 export default new DeepProxy() 导出了一个 DeepProxy 类的实例，使得其他模块可以直接使用而无需显式创建实例，简化了外部调用。<br><br>
          综上所述，这段代码提供了一个强大的工具，用于实现JavaScript中对象或数组的深度代理功能，特别适合于数据绑定、性能监控、权限控制等场景。<br><br>
        </template>
      </alert-template>
    </template>
    <template #example>
      <div class="example-title">
        引入
      </div>
      <code-template :code="importString" />
      <div class="example-title">
        Handle函数
      </div>
      <code-template :code="handleString" />
      <div class="example-title">
        使用
      </div>
      <code-template :code="useString" />
    </template>
  </common-template>
</template>

<script setup>
import proxyString from '@utils/DeepProxy/codeText'

const importString = `// 使用示例
import DeepProxy from '@utils/DeepProxy/DeepProxy'`

const handleString = `const handler = {
  get(target, prop) {
    console.log(\`Getting property \${ prop }\`);
    return target[prop];
  },
  set(target, prop, value) {
    console.log(\`Setting property \${ prop } to \${ value }\`);
    target[prop] = value;
    return true;
  }
};`

const useString = `const obj = { a: { b: 2 }, c: [3, 4] };
const proxyObj = DeepProxy.create(obj, handler);

// Getting property a, Getting property b, 2
console.log(proxyObj.a.b);
// Getting property c, Setting property 2 to 5
proxyObj.c.push(5); `
</script>

<style scoped lang="less">

</style>