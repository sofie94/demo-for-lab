import type { XtxGuessInstance } from '@/types/component'
import { ref } from 'vue'

// 封装猜你喜欢组合式函数
export const useGuessList = () => {
  // 创建猜你喜欢组件实例
  const guessRef = ref<XtxGuessInstance>()
  // 滚动触底事件
  const onScrolltolower = () => {
    guessRef.value?.getMore()
  }
  // 返回 ref 和 事件处理函数
  return {
    guessRef,
    onScrolltolower,
  }
}
