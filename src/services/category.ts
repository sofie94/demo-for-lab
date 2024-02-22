import type { CategoryTopItem } from '@/types/category'
import { http } from '@/utils/http'

// 分类列表
export const APIgetCategoryTop = () => {
  return http<CategoryTopItem[]>({
    method: 'GET',
    url: '/category/top',
  })
}
