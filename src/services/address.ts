import type { AddressParams, AddressItem } from '@/types/address'
import { http } from '@/utils/http'

// 添加收货地址
export const APIpostMemberAddress = (data: AddressParams) => {
  return http({
    method: 'POST',
    url: '/member/address',
    data,
  })
}

// 获取收货地址列表
export const APIgetMemberAddress = () => {
  return http<AddressItem[]>({
    method: 'GET',
    url: '/member/address',
  })
}

// 获取收货地址详情
export const APIgetMemberAddressById = (id: string) => {
  return http<AddressItem>({
    method: 'GET',
    url: `/member/address/${id}`,
  })
}

// 修改收货地址
export const APIputMemberAddressById = (id: string, data: AddressParams) => {
  return http({
    method: 'PUT',
    url: `/member/address/${id}`,
    data,
  })
}

// 删除收货地址
export const APIdeleteMemberAddressById = (id: string) => {
  return http({
    method: 'DELETE',
    url: `/member/address/${id}`,
  })
}
