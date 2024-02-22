import type { CartItem } from '@/types/cart'
import { http } from '@/utils/http'

// 加入购物车
export const APIpostMemberCart = (data: { skuId: string; count: number }) => {
  return http({
    method: 'POST',
    url: '/member/cart',
    data,
  })
}

// 获取购物车列表
export const APIgetMemberCart = () => {
  return http<CartItem[]>({
    method: 'GET',
    url: '/member/cart',
  })
}

// 删除购物车单品
export const APIdeleteMemberCart = (data: { ids: string[] }) => {
  return http({
    method: 'DELETE',
    url: '/member/cart',
    data,
  })
}

// 修改购物车商品
export const APIputMemberCartBySkuId = (
  skuId: string,
  data: { selected?: boolean; count?: number },
) => {
  return http({
    method: 'PUT',
    url: `/member/cart/${skuId}`,
    data,
  })
}

// 购物车列表的全选/反选
export const APIputMemberCartSelectedAll = (data: { selected: boolean }) => {
  return http({
    method: 'PUT',
    url: '/member/cart/selected',
    data,
  })
}
