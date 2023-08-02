/**
 * @Description: tabs相关类型定义
 * @Author: OceanH
 * @Date: 2023-08-02 22:55:44
 */
export interface TabApi {
  path: string
  name?: string
  meta: {
    title: string
    // 是否固定
    isAffix: boolean
    isKeepAlive?: boolean
  }
}

export type TDropdownList = {
  // 标题
  title: string
  // 是否展示
  show: boolean
  // 图标
  icon: string
  // 对应的操作类型
  operationType: number
}
